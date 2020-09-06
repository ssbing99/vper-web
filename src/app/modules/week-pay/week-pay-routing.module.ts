import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeekPayPage } from './week-pay.page';

const routes: Routes = [
  {
    path: '',
    component: WeekPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeekPayPageRoutingModule {}
