import {UicChefTermsModalComponent} from './uic-chef-terms-modal.component';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    UicChefTermsModalComponent
  ],
  imports: [
    IonicModule,
    TranslateModule,
    CommonModule
  ],
  exports: [
    UicChefTermsModalComponent,
    TranslateModule
  ]
})
export class UicChefTermsModalComponentModule {
}
