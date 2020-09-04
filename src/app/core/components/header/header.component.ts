import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AppLoginModalComponent} from '../login-modal/login-modal.component';
import {UtilService} from '../../../shared/services/util.service';
import {EventService} from '../../services/event.service';
import {EventConstant} from '../../../shared/constant/event.constant';
import {StorageService} from '../../../shared/services/storage.service';
import {AppConstant} from '../../../shared/constant/app.constant';
import {Router} from '@angular/router';
import {LoginResponseModel} from '../../../shared/models/login.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class AppHeaderComponent implements OnInit {
  isLogin = false;
  isChef = false;
  firstName = '';
  user: LoginResponseModel;

  constructor(private modalCtrl: ModalController,
              private utilService: UtilService,
              private event: EventService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.utilService.isLogged().then(async (boo) => {
      this.user = await StorageService.getItem(AppConstant.USER_KEY);
      this.isLogin = boo;
      this.firstName = await this.getName();

      if (this.user != null) {
        this.isChef = this.user.user_type === AppConstant.CHEF_TYPE;
      } else {
        this.isChef = false;
      }
    });

    this.event.subscribe(EventConstant.IS_LOGIN, async (boo) => {
      this.user = await StorageService.getItem(AppConstant.USER_KEY);
      this.isLogin = boo;
      this.firstName = await this.getName();

      if (this.user != null) {
        this.isChef = this.user.user_type === AppConstant.CHEF_TYPE;
      } else {
        this.isChef = false;
      }
    });
  }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: AppLoginModalComponent,
      cssClass: 'login-modal'
    });

    return await modal.present();
  }

  async logout() {
    await StorageService.removeItem(AppConstant.USER_KEY);
    await StorageService.removeItem(AppConstant.USER_TYPE_KEY);
    await StorageService.removeItem(AppConstant.IS_LOGIN_KEY);
    this.event.publish(EventConstant.IS_LOGIN, false);
    this.isLogin = false;

    this.router.navigate(['/']);
  }

  async getName() {
    if (this.user != null) {
      return this.user.fname;
    } else {
      return '';
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goTo(link: string, index?: number) {
    if (index) {
      this.router.navigate([link], { state: { index } });
    } else {
      this.router.navigate([link]);
    }
  }
}
