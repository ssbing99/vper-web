import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageProfilePageRoutingModule } from './manage-profile-routing.module';

import { ManageProfilePage } from './manage-profile.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {UicSkeletonComponentModule} from "../../shared/components/uic-skeleton/uic-skeleton.component.module";
import {UicStarRatingComponentModule} from "../../shared/components/uic-star-rating/uic-star-rating.component.module";
import {TranslateModule} from '@ngx-translate/core';
import {UicChefTermsModalComponentModule} from '../../shared/components/uic-chef-terms-modal/uic-chef-terms-modal.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ManageProfilePageRoutingModule,
    UicChefLayoutComponentModule,
    UicSkeletonComponentModule,
    UicStarRatingComponentModule,
    UicChefTermsModalComponentModule,
    ReactiveFormsModule
  ],
  declarations: [ManageProfilePage]
})
export class ManageProfilePageModule {}
