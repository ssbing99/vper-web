import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReviewsPageRoutingModule } from './view-reviews-routing.module';

import { ViewReviewsPage } from './view-reviews.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {UicSkeletonComponentModule} from "../../shared/components/uic-skeleton/uic-skeleton.component.module";
import {UicStarRatingComponentModule} from "../../shared/components/uic-star-rating/uic-star-rating.component.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReviewsPageRoutingModule,
    UicChefLayoutComponentModule,
    UicSkeletonComponentModule,
    UicStarRatingComponentModule
  ],
  declarations: [ViewReviewsPage]
})
export class ViewReviewsPageModule {}
