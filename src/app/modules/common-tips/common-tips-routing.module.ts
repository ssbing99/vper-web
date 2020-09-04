import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonTipsPage } from './common-tips.page';

const routes: Routes = [
  {
    path: '',
    component: CommonTipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonTipsPageRoutingModule {}
