import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartPageRoutingModule } from './start-routing.module';

import { StartPage } from './start.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StartPageRoutingModule,
        UicChefLayoutComponentModule,
        TranslateModule
    ],
  declarations: [StartPage]
})
export class StartPageModule {}
