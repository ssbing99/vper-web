import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeekPayPageRoutingModule } from './week-pay-routing.module';

import { WeekPayPage } from './week-pay.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WeekPayPageRoutingModule,
        UicChefLayoutComponentModule,
        TranslateModule
    ],
  declarations: [WeekPayPage]
})
export class WeekPayPageModule {}
