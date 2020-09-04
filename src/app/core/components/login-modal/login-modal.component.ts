import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginRequestModel, LoginResponseModel} from 'src/app/shared/models/login.model';
import {LoadingService} from 'src/app/shared/services/loading.service';
import {ModalController} from '@ionic/angular';
import {AuthRestService} from 'src/app/shared/services/api/auth.rest.service';
import {finalize, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ResponseModel} from '../../../shared/models/request.model';
import {EventService} from '../../services/event.service';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html'
})

export class AppLoginModalComponent implements OnInit {
  params: LoginRequestModel = {
    email: '',
    password: '',
    device_id: '-' // indicated as web request
  };

  constructor(
    private loadingService: LoadingService,
    private modalCtrl: ModalController,
    private authRestService: AuthRestService,
    private router: Router,
    private event: EventService,
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loadingService.presentLoading().then(() => {
      this.authRestService.login(this.params).pipe(
        tap(async (res: ResponseModel<LoginResponseModel>) => await this.authService.handleLogin(res)),
        finalize(() => this.loadingService.dismiss())
      ).subscribe();
    });
  }

  loginFb() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  goToSignUp() {
    this.router.navigate(['sign-up']);
    this.modalCtrl.dismiss();
  }
}
