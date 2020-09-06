import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDishPage } from './add-dish.page';

const routes: Routes = [
  {
    path: '',
    component: AddDishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDishPageRoutingModule {}
