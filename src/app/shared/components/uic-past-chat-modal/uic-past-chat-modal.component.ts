import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {LoginResponseModel} from '../../models/login.model';
import {StorageService} from '../../services/storage.service';
import {AppConstant} from '../../constant/app.constant';
import {EventService} from '../../../core/services/event.service';
import {EventConstant} from '../../constant/event.constant';
import {AuthRestService} from '../../services/api/auth.rest.service';
import {ChatRequestModal, PastChatModel} from '../../models/chat.modal';
import {finalize, tap} from 'rxjs/operators';

@Component({
  selector: 'app-past-chat-modal',
  templateUrl: './uic-past-chat-modal.component.html'
})
export class UicPastChatModalComponent implements OnInit {
  @Input() toUserId: string;
  @Input() orderId: string;

  chatData = [];
  user: LoginResponseModel;
  loading = false;
  toUserImage = '';
  fromUserImage = '';

  constructor(private modalCtrl: ModalController,
              private router: Router,
              private authRestService: AuthRestService,
              private platform: Platform) {
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
    this.authRestService.getPastChat({
      user_id_to: this.toUserId,
      user_id_from: this.user.id,
      order_id: this.orderId
    }).pipe(
      tap((res: PastChatModel) => {
        if (res.data != null) {
          res.data.forEach(chat => {
            if (this.platform.is('ios')) {
              const temp = chat.date.split(' ');
              const tempDate = temp[0].split('-');
              chat.date = tempDate[1] + '/' + tempDate[2] + '/' + tempDate[0] + ' ' + temp[1];
            }
            chat.timestamp = Date.parse(chat.date + ' GMT');
          });
          this.chatData = res.data;
          this.toUserImage = res.toImage;
          this.fromUserImage = res.fromImage;
        }

        this.scrollToBottom();
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  private scrollToBottom() {
    setTimeout(() => {
      const body = document.getElementsByClassName('msg_container_base')[0];
      body.scrollTo(0, body.scrollHeight);
    }, 100);
  }
}
