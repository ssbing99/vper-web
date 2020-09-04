import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppConstant} from '../constant/app.constant';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  setDefaultLanguage() {
    this.translate.setDefaultLang(AppConstant.DEFAULT_LANGUAGE);
  }

  getCurrentLanguage() {
    switch (this.translate.currentLang.toString()) {
      case 'pcm':
        return AppConstant.PCM_LANG;
      case 'en':
        return AppConstant.EN_LANG;
      default:
        return AppConstant.DEFAULT_LANGUAGE;
    }
  }

  setLanguage(lng) {
    this.translate.use(lng);
  }
}
