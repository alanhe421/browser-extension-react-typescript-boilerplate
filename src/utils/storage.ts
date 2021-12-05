import * as localforage from 'localforage';

export default class StorageUtils {
  static saveToken(token: string) {
    localforage.setItem('token', token);
  }
}
