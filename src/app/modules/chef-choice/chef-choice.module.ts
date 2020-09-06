import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefChoicePageRoutingModule } from './chef-choice-routing.module';

import { ChefChoicePage } from './chef-choice.page';
import {UicSkeletonComponentModule} from "../../shared/components/uic-skeleton/uic-skeleton.component.module";
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChefChoicePageRoutingModule,
        UicSkeletonComponentModule,
        UicChefLayoutComponentModule
    ],
  declarations: [ChefChoicePage]
})
export class ChefChoicePageModule {}
