import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferralPageRoutingModule } from './referral-routing.module';

import { ReferralPage } from './referral.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferralPageRoutingModule,
    UicChefLayoutComponentModule,
    TranslateModule
  ],
  declarations: [ReferralPage]
})
export class ReferralPageModule {}
