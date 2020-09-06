import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDishPageRoutingModule } from './add-dish-routing.module';

import { AddDishPage } from './add-dish.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddDishPageRoutingModule,
        UicChefLayoutComponentModule,
        ReactiveFormsModule
    ],
  declarations: [AddDishPage]
})
export class AddDishPageModule {}
