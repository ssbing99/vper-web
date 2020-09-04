import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ChefDetailsPageRoutingModule} from './chef-details-routing.module';

import {ChefDetailsPage} from './chef-details.page';
import {UicStarRatingComponentModule} from '../../shared/components/uic-star-rating/uic-star-rating.component.module';
import {UicFooterComponentModule} from '../../shared/components/uic-footer/uic-footer.component.module';
import {UicCountCostComponentModule} from '../../shared/components/uic-count-cost/uic-count-cost.component.module';
import {TranslateModule} from '@ngx-translate/core';
import {UicChatModalComponentModule} from '../../shared/components/uic-chat-modal/uic-chat-modal.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefDetailsPageRoutingModule,
    UicStarRatingComponentModule,
    UicFooterComponentModule,
    UicCountCostComponentModule,
    UicChatModalComponentModule,
    TranslateModule.forChild()
  ],
  declarations: [ChefDetailsPage]
})
export class ChefDetailsPageModule {
}
