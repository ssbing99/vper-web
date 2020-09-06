import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {LoginResponseModel} from '../../models/login.model';
import {StorageService} from '../../services/storage.service';
import {AppConstant} from '../../constant/app.constant';
import {EventService} from '../../../core/services/event.service';
import {EventConstant} from '../../constant/event.constant';
import {AuthRestService} from '../../services/api/auth.rest.service';
import {ChatRequestModal} from '../../models/chat.modal';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './uic-chat-modal.component.html'
})
export class UicChatModalComponent implements OnInit {
  @Input() toUserId: string;
  @Input() toUserImage: string;
  @Input() isChef: boolean = false;

  chatData = [];
  user: LoginResponseModel;
  loading = false;
  chatText = '';
  constructor(private modalCtrl: ModalController,
              private router: Router,
              private chatService: ChatService,
              private eventService: EventService,
              private authRestService: AuthRestService) {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  book() {
    this.modalCtrl.dismiss().then(() => {
      this.router.navigate(['/book-chef', this.toUserId]);
    });
  }

  async ngOnInit() {
    this.loading = true;
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    this.chatService.getbuddymessages(this.user.id, this.toUserId);

    this.eventService.subscribe(EventConstant.CHAT_DATA, () => {
      this.loading = false;
      this.chatData = this.chatService.buddymessages;
      this.scrollToBottom();
    });

    this.eventService.subscribe(EventConstant.CHAT_EXIST, (data) => {
      if (data == null || data.length === 0) {
        const params: ChatRequestModal = {
          user_id_from: this.user.id,
          user_id_to: this.toUserId
        };
        this.authRestService.saveChatList(params).subscribe();
      }
    });
  }

  sendToChat() {
    if (this.chatText != null && this.chatText !== '') {
      const params = {
        user_id_from: this.user.id,
        user_id_to: this.toUserId,
        message: this.chatText,
        type: 'user'
      };

      this.chatData.push(params);
      this.chatService.getChatExist(this.toUserId, this.user.id);
      this.chatService.addnewmessage(this.chatText, this.user.id, this.toUserId).then(() => {
        this.scrollToBottom();
        this.chatText = '';
      });
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      const body = document.getElementsByClassName('msg_container_base')[0];
      body.scrollTo(0, body.scrollHeight);
    }, 100);
  }

  ionViewDidLeave() {
    this.chatService.offListener(this.user.id, this.toUserId);
    this.eventService.destroy(EventConstant.CHAT_DATA);
    this.eventService.destroy(EventConstant.CHAT_EXIST);
  }
}
