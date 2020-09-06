import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessConceptPageRoutingModule } from './business-concept-routing.module';

import { BusinessConceptPage } from './business-concept.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessConceptPageRoutingModule,
    UicChefLayoutComponentModule,
    TranslateModule
  ],
  declarations: [BusinessConceptPage]
})
export class BusinessConceptPageModule {}
