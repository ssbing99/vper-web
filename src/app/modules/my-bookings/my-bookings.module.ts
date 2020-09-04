import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MyBookingsPageRoutingModule} from './my-bookings-routing.module';

import {MyBookingsPage} from './my-bookings.page';
import {UicChefLayoutComponentModule} from '../../shared/components/uic-chef-layout/uic-chef-layout.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBookingsPageRoutingModule,
    UicChefLayoutComponentModule
  ],
  declarations: [MyBookingsPage]
})
export class MyBookingsPageModule {}
