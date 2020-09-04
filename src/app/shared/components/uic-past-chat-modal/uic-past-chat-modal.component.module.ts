import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {UicPastChatModalComponent} from './uic-past-chat-modal.component';
import {TranslateModule} from '@ngx-translate/core';
import {ChatService} from '../../services/chat.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UicPastChatModalComponent
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    CommonModule,
    FormsModule
  ],
  exports: [
    UicPastChatModalComponent
  ],
  providers: [
    ChatService
  ]
})
export class UicPastChatModalComponentModule {}
