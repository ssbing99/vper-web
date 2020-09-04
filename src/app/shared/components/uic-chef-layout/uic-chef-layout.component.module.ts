import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UicChefLayoutComponent} from './uic-chef-layout.component';
import {UicFooterComponentModule} from '../uic-footer/uic-footer.component.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    UicChefLayoutComponent
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    UicFooterComponentModule,
    RouterModule
  ],
  exports: [
    UicChefLayoutComponent
  ],
  providers: []
})
export class UicChefLayoutComponentModule {}
