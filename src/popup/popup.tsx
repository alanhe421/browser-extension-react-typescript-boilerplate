import React, { useCallback } from 'react';
import './popup.less';
import { Button, Form, Input } from 'tea-component';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { app } from '../utils/utils';
import create from 'zustand';

const size = [document.body.clientWidth, document.body.clientHeight];

/**
 * 禁止修改 popup弹窗大小，new window时无法直接设置禁用resize，因此通过该方法解决
 */
function resizeThrottler() {
  window.resizeTo(size[0], size[1]);
}

window.addEventListener('resize', resizeThrottler, false);

/**
 * 全局状态管理
 */
interface AppState {
  loginCount: number;
  addLoginCount: () => void;
}

const useAppStore = create<AppState>(set => ({
  loginCount: 0,
  addLoginCount: () => set(state => ({ loginCount: state.loginCount + 1 })),
}));

export default function Popup() {
  return <Router>
    <CustomRoutes/>
  </Router>;
}

/**
 * 路由系统
 */
function CustomRoutes() {
  return <Routes>
    <Route index element={<LoginPage/>}/>
  </Routes>;
}

function LoginPage() {
  const addLoginCount = useAppStore(state => state.addLoginCount);
  const loginCount = useAppStore(state => state.loginCount);
  const {
    control, formState: {
      isValid,
    },
  } = useForm({
    mode: 'onBlur',
  });

  const handleClick = useCallback(() => {
    window.open(CRX_CONFIG.issueURL);
  }, []);

  return <div className={'login'}>
    <Form layout={'vertical'}>
      <Controller name={'username'}
                  control={control}
                  rules={{
                    required: '请输入用户名',
                  }
                  }
                  render={({ field }) => {
                    return <Form.Item label={'用户名'}>
                      <Input  {...field}/>
                    </Form.Item>;
                  }
                  }/>
      <Controller name={'password'}
                  control={control}
                  rules={{
                    required: '请输入密码',
                  }
                  }
                  render={({ field }) => {
                    return <Form.Item label={'密码'}>
                      <Input {...field}/>
                    </Form.Item>;
                  }
                  }/>
      <Button type={'primary'} disabled={!isValid} onClick={() => addLoginCount()}>
        登录{loginCount}
      </Button>
    </Form>
    <footer>
      v{
      app.manifest.version
    }，<a onClick={handleClick}>issue url</a>
    </footer>
  </div>;
}
