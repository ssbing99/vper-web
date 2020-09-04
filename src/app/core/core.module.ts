import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { AppHeaderComponent } from './components/header/header.component';
import { EventService } from './services/event.service';
import { BasePageComponent } from './components/base-page/base-page.component';
import { CommonModule } from '@angular/common';
import { AppLoginModalComponent } from './components/login-modal/login-modal.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from './interceptor/api.interceptor';
import {UtilService} from '../shared/services/util.service';
import {AuthService} from './services/auth.service';
import {UicFooterComponentModule} from '../shared/components/uic-footer/uic-footer.component.module';

const CORE_COMPONENTS = [
  AppHeaderComponent,
  BasePageComponent,
  AppLoginModalComponent,
];

@NgModule({
  declarations: [...CORE_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    UicFooterComponentModule
  ],
  providers: [
    UtilService
  ],
  entryComponents: [],
  exports: [
    ...CORE_COMPONENTS
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true
        },
        EventService,
        AuthService
      ]
    };
  }
}
