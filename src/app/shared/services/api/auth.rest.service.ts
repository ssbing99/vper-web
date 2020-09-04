import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginFacebookModel, LoginGoogleModel, LoginRequestModel} from '../../models/login.model';
import {ChefSignUpRequestModel, UserSignUpRequestModel} from '../../models/user.modal';
import {ChatRequestModal, PastChatRequestModel} from '../../models/chat.modal';
import {GetChefInfoRequest} from '../../models/chef.model';

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {
  private readonly BASE_URL = environment.apiUrl + 'auth';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  login(params: LoginRequestModel) {
    params.method = 'login';
    return this.httpClient.post(this.BASE_URL, params);
  }

  loginFb(params: LoginFacebookModel) {
    params.method = 'fbLogin';
    return this.httpClient.post(this.BASE_URL, params);
  }

  loginGoogle(params: LoginGoogleModel) {
    params.method = 'googleLogin';
    return this.httpClient.post(this.BASE_URL, params);
  }

  userSignUp(params: UserSignUpRequestModel) {
    params.method = 'signupAsUser';
    return this.httpClient.post(this.BASE_URL, params);
  }

  chefSignUp(params: ChefSignUpRequestModel) {
    params.method = 'signupAsChef';
    return this.httpClient.post(this.BASE_URL, params);
  }

  saveChatList(params: ChatRequestModal) {
    params.method = 'UserChatSaveData';
    return this.httpClient.post(this.BASE_URL, params);
  }

  getPastChat(params: PastChatRequestModel) {
    params.method = 'UserChatGetDataByorderId';
    return this.httpClient.post(this.BASE_URL, params);
  }

  getChefCommonTips(params: GetChefInfoRequest) {
    params.method = 'getchefCommontips';
    return this.httpClient.post(this.BASE_URL, params);
  }
}
