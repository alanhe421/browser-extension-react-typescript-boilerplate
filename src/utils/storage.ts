import * as localforage from 'localforage';

/**
 * WebSQL已不提倡，这里推荐使用IndexDB或localStorage，两者区别在于存储大小限制
 */
const store = localforage.createInstance({
  name: 'boilerplate',
  version: 1.0,
  driver: localforage.INDEXEDDB,
});

const localForgeUtils = {

  /**
   * @param expire 单位是秒
   */
  setData: async <T>(store: LocalForage, key: string, data: T, expire: number | false) => {
    await store.setItem(key, {
      expire: typeof expire === 'number' ? Date.now() + expire * 1000 : expire,
      data,
    });
  },

  getData: async <T>(store: LocalForage, key: string): Promise<any> => {
    const expireData: {
      expire: number,
      data: T
    } = await store.getItem(key);
    if (expireData) {
      if ((typeof expireData.expire === 'number') && expireData.expire < Date.now()) {
        await store.removeItem(key);
        return null;
      }
      return expireData.data;
    }
    return null;
  },
  removeData: <T>(store: LocalForage, key: string) => {
    store.removeItem(key);
  },
};

export default class StorageUtils {

  static getWindowId() {
    return localForgeUtils.getData(store, `window_id`);
  }

  static setWindowId(id: number) {
    return localForgeUtils.setData(store, `window_id`, id, false);
  }

  static setDebug(debug: boolean) {
    localStorage.setItem('debug', String(debug));
  }

  static getDebug() {
    return localStorage.getItem('debug') === 'true';
  }
}
