import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  static async setItem(key: string, value: any) {
    await Storage.set({
      key,
      value: JSON.stringify(value)
    });
  }

  static async getItem(key: string) {
    const ret = await Storage.get({key});
    return JSON.parse(ret.value);
  }

  static async removeItem(key: string) {
    await Storage.remove({key});
  }

  static async clear() {
    await Storage.clear();
  }
}
