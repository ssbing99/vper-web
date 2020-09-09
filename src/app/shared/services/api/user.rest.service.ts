import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { UserAccountRequestModel } from '../../models/user.modal';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  private readonly BASE_URL = environment.apiUrl + 'auth';

  constructor(private httpClient: HttpClient) { }

  getUserDetail(userId: string) {
      return this.httpClient.post(this.BASE_URL, {
        "userId": userId,
        "method": 'getChefProfileDetail'
      });
  }

  upDateCustomerDetail(params: UserAccountRequestModel) {
    params.userId = params.id;
    params.method = 'updateuserProfileWithUpload'
    return this.httpClient.post(this.BASE_URL, params);
  }

  upDateUserDetail(params: UserAccountRequestModel) {
    params.userId = params.id;
    params.method = 'updateChefProfileWithUpload'
    return this.httpClient.post(this.BASE_URL, params);
  }

  changePassword(params) {
    params.method = "changePassword";
    return this.httpClient.post(this.BASE_URL, params);
  }

  changePushSetting(params: any) {
    params.method = 'UpdateNotificationSetting';
    return this.httpClient.post(this.BASE_URL, params);
  }
  getAppShareUrl(){
    return this.httpClient.get(environment.apiUrl + 'app_share_url');
  }
  getCountry() {
    return this.httpClient.post(environment.apiUrl + 'dish', {
      "method": 'getAllcountryList',
    });
  }
}
