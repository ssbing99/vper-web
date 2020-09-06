import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {LoginResponseModel} from "../../shared/models/login.model";
import {DishRestService} from "../../shared/services/api/dish.rest.service";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {finalize, tap} from "rxjs/operators";
import {ChatInfoModel} from "../../shared/models/chat.modal";
import {ChefModel} from "../../shared/models/chef.model";
import {UicChatModalComponent} from "../../shared/components/uic-chat-modal/uic-chat-modal.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-chef-chat-list',
  templateUrl: './chef-chat-list.page.html',
  styleUrls: ['./chef-chat-list.page.scss'],
})
export class ChefChatListPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  loading = true;
  chatInfoList: Array<ChatInfoModel> = [];

  constructor(protected injector: Injector,
              private dishRestService: DishRestService,
              private modalCtrl: ModalController) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    this.getChefChatList();
  }

  private getChefChatList() {
    if (!!this.user) {
      const { id = '' } = this.user;
      this.dishRestService.getChefChatList({ user_id_to: id })
          .pipe(
              tap((res: any) => {
                const { data = [] } = res
                this.chatInfoList = data;
                console.log(this.chatInfoList);
              }),
              finalize(() => this.loading = false)
          )
          .subscribe();
    }
  }

    async showChat(chatInfoModel: ChatInfoModel) {
        const modal = await this.modalCtrl.create({
            component: UicChatModalComponent,
            cssClass: 'login-modal',
            componentProps: {
                toUserId: chatInfoModel.id,
                toUserImage: chatInfoModel.user_image,
                isChef: true
            }
        });

        return await modal.present();
    }
}
