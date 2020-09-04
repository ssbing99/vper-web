import {NgModule} from '@angular/core';
import {UicCountCostComponent} from './uic-count-cost.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UicCountCostModalComponent} from './uic-count-cost-modal.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [
    UicCountCostComponent,
    UicCountCostModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    UicCountCostComponent,
    UicCountCostModalComponent
  ]
})
export class UicCountCostComponentModule {
}
