import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReferralPageRoutingModule } from './my-referral-routing.module';

import { MyReferralPage } from './my-referral.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {TranslateModule} from "@ngx-translate/core";
import {UicSkeletonComponentModule} from "../../shared/components/uic-skeleton/uic-skeleton.component.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyReferralPageRoutingModule,
    UicChefLayoutComponentModule,
    TranslateModule,
    UicSkeletonComponentModule
  ],
  declarations: [MyReferralPage]
})
export class MyReferralPageModule {}
