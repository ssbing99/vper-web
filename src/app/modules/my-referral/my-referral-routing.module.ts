import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyReferralPage } from './my-referral.page';

const routes: Routes = [
  {
    path: '',
    component: MyReferralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyReferralPageRoutingModule {}
