import {UicUserTermsModalComponent} from './uic-user-terms-modal.component';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    UicUserTermsModalComponent
  ],
  imports: [
    IonicModule,
    TranslateModule,
    CommonModule
  ],
  exports: [
    UicUserTermsModalComponent,
    TranslateModule
  ]
})
export class UicUserTermsModalComponentModule {
}
