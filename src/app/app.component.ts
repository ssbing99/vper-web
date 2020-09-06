import {Component, OnDestroy} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {EventService} from './core/services/event.service';
import {EventConstant} from './shared/constant/event.constant';
import {UtilService} from './shared/services/util.service';
import {Router} from '@angular/router';
import {AppConstant} from './shared/constant/app.constant';
import {AuthService} from './core/services/auth.service';
import {LanguageService} from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  contentTop = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private event: EventService,
    private utilService: UtilService,
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();

      this.languageService.setDefaultLanguage();

      this.event.subscribe(EventConstant.HEADER_LOAD, () => {
        this.contentTop = document.getElementById('header-root').offsetHeight;
      });

      this.utilService.isLogged().then(async (boo) => {
        if (boo) {
          const userType = await this.utilService.getUserType();
          switch (userType) {
            case AppConstant.USER_TYPE:
              this.router.navigate(['/search-chef']);
              break;
            case AppConstant.CHEF_TYPE:
              this.router.navigate(['/start-page']);
              break;
          }
        }
      });

      // Subscribe Logins
      this.authService.subscribeLogin();
    });
  }

  ngOnDestroy(): void {
    this.authService.unsubscribeLogin();
  }
}
