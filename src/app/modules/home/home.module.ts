import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UicFooterComponentModule } from 'src/app/shared/components/uic-footer/uic-footer.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    UicFooterComponentModule,
  ],
  declarations: [
    HomePage,
  ]
})
export class HomePageModule {}
