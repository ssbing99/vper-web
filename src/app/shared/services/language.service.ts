import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppConstant} from '../constant/app.constant';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  defaultLng : {language?: string};
  constructor(private translate: TranslateService) {}

  async setDefaultLanguage() {
    this.defaultLng = await StorageService.getItem(AppConstant.LANG_TYPE);
    this.translate.setDefaultLang((this.defaultLng && this.defaultLng.language ? this.defaultLng.language : AppConstant.DEFAULT_LANGUAGE));
  }

  getCurrentLanguage() {
      switch (this.translate.defaultLang.toString()) {
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
    StorageService.setItem(AppConstant.LANG_TYPE, { language : lng});
  }
}
