import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefMyEarningPageRoutingModule } from './chef-my-earning-routing.module';

import { ChefMyEarningPage } from './chef-my-earning.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChefMyEarningPageRoutingModule,
        UicChefLayoutComponentModule,
        TranslateModule
    ],
  declarations: [ChefMyEarningPage]
})
export class ChefMyEarningPageModule {}
