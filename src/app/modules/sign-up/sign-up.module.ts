import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SignUpPageRoutingModule} from './sign-up-routing.module';

import {SignUpPage} from './sign-up.page';
import {UicFooterComponentModule} from 'src/app/shared/components/uic-footer/uic-footer.component.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    UicFooterComponentModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule {
}
