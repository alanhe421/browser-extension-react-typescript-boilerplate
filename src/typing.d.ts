export {};

declare global {
  interface Window {
    extSdk: {
      sendMessage: (msg: string) => void;
    };
  }

  /**
   * @description 全局环境变量，具体配置值见Package.json
   */
  const CRX_CONFIG: {
    issueURL: string;
  };

}
