import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefDetailsPage } from './chef-details.page';

const routes: Routes = [
  {
    path: '',
    component: ChefDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefDetailsPageRoutingModule {}
