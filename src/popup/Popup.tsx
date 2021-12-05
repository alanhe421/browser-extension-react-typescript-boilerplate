import React, { useEffect } from 'react';
import './Popup.less';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

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
  return <>login page</>;
}
