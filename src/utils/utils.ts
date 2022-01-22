

export function pick<T, K extends keyof T>(obj: T, paths: K[] = []): Pick<T, K> {
  return paths.reduce((res: any, k) => {
    if (k in obj) {
      res[k] = obj[k];
    }
    return res;
  }, {});
}

export function omit<T, K extends keyof T>(obj: T, paths: K[] = []): Exclude<T, K> {
  return paths.reduce(
    (res: any, k) => {
      if (k in res) {
        delete res[k];
      }
      return res;
    },
    { ...obj },
  );
}

/**
 * 全局上下文一些信息
 */
export const app = {
  manifest: chrome.runtime.getManifest(),
};

