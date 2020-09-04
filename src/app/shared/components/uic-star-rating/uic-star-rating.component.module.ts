import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {UicStarRatingComponent} from './uic-star-rating.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    UicStarRatingComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    UicStarRatingComponent
  ]
})
export class UicStarRatingComponentModule {
}
