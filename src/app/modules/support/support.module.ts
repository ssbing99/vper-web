import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportPageRoutingModule } from './support-routing.module';

import { SupportPage } from './support.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SupportPageRoutingModule,
        UicChefLayoutComponentModule,
        TranslateModule
    ],
  declarations: [SupportPage]
})
export class SupportPageModule {}
