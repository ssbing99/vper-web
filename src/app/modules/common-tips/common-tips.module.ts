import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonTipsPageRoutingModule } from './common-tips-routing.module';

import { CommonTipsPage } from './common-tips.page';
import {UicChefLayoutComponentModule} from '../../shared/components/uic-chef-layout/uic-chef-layout.component.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonTipsPageRoutingModule,
    UicChefLayoutComponentModule,
    TranslateModule.forChild()
  ],
  declarations: [CommonTipsPage]
})
export class CommonTipsPageModule {}
