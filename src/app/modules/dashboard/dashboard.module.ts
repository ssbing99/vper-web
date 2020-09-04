import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { UicFooterComponentModule } from 'src/app/shared/components/uic-footer/uic-footer.component.module';
import {TranslateModule} from '@ngx-translate/core';
import {UicPastChatModalComponentModule} from '../../shared/components/uic-past-chat-modal/uic-past-chat-modal.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    UicFooterComponentModule,
    UicPastChatModalComponentModule,
    TranslateModule.forChild()
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
