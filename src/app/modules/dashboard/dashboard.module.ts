import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { UicFooterComponentModule } from 'src/app/shared/components/uic-footer/uic-footer.component.module';
import {TranslateModule} from '@ngx-translate/core';
import {UicPastChatModalComponentModule} from '../../shared/components/uic-past-chat-modal/uic-past-chat-modal.component.module';
import { UicUserTermsModalComponentModule } from 'src/app/shared/components/uic-user-terms-modal/uic-user-terms-modal.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    UicFooterComponentModule,
    UicPastChatModalComponentModule,
    UicUserTermsModalComponentModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
