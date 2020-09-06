import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefChatListPage } from './chef-chat-list.page';

const routes: Routes = [
  {
    path: '',
    component: ChefChatListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefChatListPageRoutingModule {}
