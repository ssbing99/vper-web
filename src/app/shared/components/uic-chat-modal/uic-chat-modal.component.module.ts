import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {UicChatModalComponent} from './uic-chat-modal.component';
import {TranslateModule} from '@ngx-translate/core';
import {ChatService} from '../../services/chat.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UicChatModalComponent
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    CommonModule,
    FormsModule
  ],
  exports: [
    UicChatModalComponent
  ],
  providers: [
    ChatService
  ]
})
export class UicChatModalComponentModule {}
