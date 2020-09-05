import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickPayPageRoutingModule } from './quick-pay-routing.module';

import { QuickPayPage } from './quick-pay.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QuickPayPageRoutingModule,
        UicChefLayoutComponentModule,
        TranslateModule
    ],
  declarations: [QuickPayPage]
})
export class QuickPayPageModule {}
