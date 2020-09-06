import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefMyEarningPage } from './chef-my-earning.page';

const routes: Routes = [
  {
    path: '',
    component: ChefMyEarningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefMyEarningPageRoutingModule {}
