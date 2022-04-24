import * as localforage from 'localforage';

type LocalStorageArea = chrome.storage.LocalStorageArea;

/**
 * WebSQL已不提倡，这里推荐使用IndexDB或localStorage，两者区别在于存储大小限制
 */
const store = localforage.createInstance({
  name: 'boilerplate',
  version: 1.0,
  driver: localforage.INDEXEDDB,
});

const chromeStore = chrome.storage.local;

function isLocalForage<T>(storage: LocalForage | LocalStorageArea): storage is LocalForage {
  return 'INDEXEDDB' in storage;
}

const baseUtils = {

  /**
   * @param expire 单位是秒
   */
  setData: async <T>(store: LocalForage | LocalStorageArea, key: string, data: T, expire: number | false) => {
    let value = {
      expire: typeof expire === 'number' ? Date.now() + expire * 1000 : expire,
      data,
    };
    if (isLocalForage(store)) {
      await store.setItem(key, value);
    } else {
      return new Promise<void>((resolve) => (store.set({ key: value }, resolve)));
    }
  },

  getData: async <T>(store: LocalForage | LocalStorageArea, key: string): Promise<T> => {
    let expireData: {
      expire: number,
      data: T
    };

    if (isLocalForage(store)) {
      expireData = await store.getItem(key);
    } else {
      expireData = await new Promise((resolve) => store.get([key], resolve));
    }
    if (expireData) {
      if ((typeof expireData.expire === 'number') && expireData.expire < Date.now()) {
        await baseUtils.removeData(store, key);
        return null;
      }
      return expireData.data;
    }
    return null;
  },
  removeData: async (store: LocalForage | LocalStorageArea, key: string) => {
    if (isLocalForage(store)) {
      await store.removeItem(key);
    } else {
      await new Promise<void>(resolve => store.remove([key], resolve));
    }
  },
};

export default class StorageUtils {

  static getWindowId() {
    return baseUtils.getData<number>(store, `window_id`);
  }

  static setWindowId(id: number) {
    return baseUtils.setData(store, `window_id`, id, false);
  }

  static setDebug(debug: boolean) {
    localStorage.setItem('debug', String(debug));
  }

  static getDebug() {
    return localStorage.getItem('debug') === 'true';
  }


  static setLoginCount(count) {
    return baseUtils.setData(chromeStore, 'login_count', count, false);
  }

  static getLoginCount(count: number) {
    return baseUtils.getData<number>(chromeStore, 'login_count');
  }

}
