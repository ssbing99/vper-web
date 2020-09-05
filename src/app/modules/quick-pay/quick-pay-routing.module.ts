import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickPayPage } from './quick-pay.page';

const routes: Routes = [
  {
    path: '',
    component: QuickPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickPayPageRoutingModule {}
