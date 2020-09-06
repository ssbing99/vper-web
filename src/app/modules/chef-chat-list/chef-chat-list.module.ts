import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefChatListPageRoutingModule } from './chef-chat-list-routing.module';

import { ChefChatListPage } from './chef-chat-list.page';
import {UicChefLayoutComponentModule} from "../../shared/components/uic-chef-layout/uic-chef-layout.component.module";
import {UicSkeletonComponentModule} from "../../shared/components/uic-skeleton/uic-skeleton.component.module";
import {ChatService} from "../../shared/services/chat.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChefChatListPageRoutingModule,
        UicChefLayoutComponentModule,
        UicSkeletonComponentModule
    ],
    declarations: [ChefChatListPage],
    providers: [
        ChatService
    ]
})
export class ChefChatListPageModule {}
