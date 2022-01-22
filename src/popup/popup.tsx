import React, { useEffect } from 'react';
import './popup.less';
import { Form, Input, Button } from 'tea-component';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { app } from '../utils/utils';

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
