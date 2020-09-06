import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefChoicePage } from './chef-choice.page';

const routes: Routes = [
  {
    path: '',
    component: ChefChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefChoicePageRoutingModule {}
