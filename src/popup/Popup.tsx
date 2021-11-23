import React, { useEffect } from "react";
import "./Popup.less";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return <div className="popupContainer">Hello, world!</div>;
}
