import React, { useEffect } from 'react';
import './Popup.less';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return <div className="popupContainer">
    <Router>
      <CustomRoutes/>
    </Router>
  </div>;
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

  return <>
    <form>
      <label htmlFor={'username'}>
        用户名
        <Controller name={'username'}
                    control={control}
                    rules={{
                      required: '请输入用户名',
                    }
                    }
                    render={({ field }) => {
                      return <input  {...field}/>;
                    }
                    }/>
      </label>
      <label htmlFor={'password'}>
        密码
        <Controller name={'password'}
                    control={control}
                    rules={{
                      required: '请输入密码',
                    }
                    }
                    render={({ field }) => {
                      return <input  {...field}/>;
                    }
                    }/>
      </label>
      <button disabled={!isValid}>
        登录
      </button>
    </form>

  </>;
}
