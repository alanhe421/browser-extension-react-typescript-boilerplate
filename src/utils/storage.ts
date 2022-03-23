import * as localforage from 'localforage';

/**
 * WebSQL已不提倡，这里推荐使用IndexDB或localStorage，两者区别在于存储大小限制
 */
const store = localforage.createInstance({
  name: 'boilerplate',
  version: 1.0,
  driver: localforage.INDEXEDDB,
});

export default class StorageUtils {

  /**
   * @param expire 单位是秒
   */
  static async setData<T>(key: string, data: T, expire: number | false) {
    await store.setItem(key, {
      expire: typeof expire === 'number' ? Date.now() + expire * 1000 : expire,
      data,
    });
  }

  static async getData<T>(key: string) {
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
  }

  static async removeData<T>(key: string) {
    await store.removeItem(key);
  }

  static saveToken(token: string) {
    StorageUtils.setData('token', token, false);
  }
}
