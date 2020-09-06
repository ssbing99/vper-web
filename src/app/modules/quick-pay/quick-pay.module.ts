import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickPayPageRoutingModule } from './quick-pay-routing.module';

import { QuickPayPage } from './quick-pay.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {TranslateModule} from "@ngx-translate/core";
import {UicSkeletonComponentModule} from "../../shared/components/uic-skeleton/uic-skeleton.component.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QuickPayPageRoutingModule,
        UicChefLayoutComponentModule,
        TranslateModule,
        UicSkeletonComponentModule
    ],
  declarations: [QuickPayPage]
})
export class QuickPayPageModule {}
