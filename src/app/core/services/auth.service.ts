import {Injectable} from '@angular/core';
import {finalize, takeUntil, tap} from 'rxjs/operators';
import {ResponseModel} from '../../shared/models/request.model';
import {LoginResponseModel} from '../../shared/models/login.model';
import {SocialAuthService} from 'angularx-social-login';
import {LoadingService} from '../../shared/services/loading.service';
import {AuthRestService} from '../../shared/services/api/auth.rest.service';
import {ModalController} from '@ionic/angular';
import {Subject} from 'rxjs';
import {StorageService} from '../../shared/services/storage.service';
import {AppConstant} from '../../shared/constant/app.constant';
import {EventConstant} from '../../shared/constant/event.constant';
import {EventService} from './event.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private unsubscribe$ = new Subject<void>();

  constructor(private authService: SocialAuthService,
              private loadingService: LoadingService,
              private authRestService: AuthRestService,
              private modalCtrl: ModalController,
              private event: EventService,
              private router: Router) {
  }

  subscribeLogin() {
    this.authService.authState
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user != null) {
          if (user.provider === 'FACEBOOK') {
            this.loadingService.presentLoading().then(() => {
              this.authRestService.loginFb({
                name: user.name,
                id: user.id,
                image: user.photoUrl,
                email: user.email,
                device_id: '-',
                device_platform: ''
              }).pipe(
                tap(async (res: ResponseModel<LoginResponseModel>) => await this.handleLogin(res)),
                finalize(() => {
                  this.loadingService.dismiss();
                  console.log('here');
                })
              ).subscribe();
            });
          } else if (user.provider === 'GOOGLE') {
            this.loadingService.presentLoading().then(() => {
              this.authRestService.loginGoogle({
                userId: user.id,
                email: user.email,
                familyName: user.lastName,
                givenName: user.firstName,
                imageUrl: user.photoUrl,
                device_id: '-',
                device_platform: ''
              }).pipe(
                tap(async (res: ResponseModel<LoginResponseModel>) => await this.handleLogin(res)),
                finalize(() => this.loadingService.dismiss())
              ).subscribe();
            });
          }
        }
      });
  }

  async handleLogin(res: ResponseModel<LoginResponseModel>) {
    if (res.status === 200) {
      await StorageService.setItem(AppConstant.USER_KEY, res.data);
      await StorageService.setItem(AppConstant.USER_TYPE_KEY, res.data.user_type);
      await StorageService.setItem(AppConstant.IS_LOGIN_KEY, true);

      // Publish events to update UI
      this.event.publish(EventConstant.IS_LOGIN, true);

      switch (res.data.user_type) {
        case AppConstant.USER_TYPE:
          this.router.navigate(['/search-chef']);
          break;
        case AppConstant.CHEF_TYPE:
          this.router.navigate(['/start-page']);
          break;
      }

      this.modalCtrl.dismiss();
    }
  }

  unsubscribeLogin() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
