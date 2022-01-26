import React from 'react';
import './popup.less';
import { Button, Form, Input } from 'tea-component';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { app } from '../utils/utils';

const size = [document.body.clientWidth, document.body.clientHeight];

/**
 * 禁止修改 popup弹窗大小，new window时无法直接设置禁用resize，因此通过该方法解决
 */
function resizeThrottler() {
  window.resizeTo(size[0], size[1]);
}

window.addEventListener('resize', resizeThrottler, false);

export default function Popup() {
  return <Router>
    <CustomRoutes/>
  </Router>;
}

function CustomRoutes() {
  return <Routes>
    <Route index element={<LoginPage/>}/>
  </Routes>;
}

function LoginPage() {
  const {
    control, formState: {
      isValid,
    },
  } = useForm({
    mode: 'onBlur',
  });

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
      <Button type={'primary'} disabled={!isValid}>
        登录
      </Button>
    </Form>
    <footer>
      v{
      app.manifest.version
    }
    </footer>
  </div>;
}
