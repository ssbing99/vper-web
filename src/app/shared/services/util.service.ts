import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {AppConstant} from '../constant/app.constant';

@Injectable()
export class UtilService {

  constructor() {}

  async isLogged() {
    return await StorageService.getItem(AppConstant.IS_LOGIN_KEY);
  }

  async getUserType() {
    return await StorageService.getItem(AppConstant.USER_TYPE_KEY);
  }

  isAssetPath = (url: string): boolean => url.indexOf('assets') >= 0;
}
