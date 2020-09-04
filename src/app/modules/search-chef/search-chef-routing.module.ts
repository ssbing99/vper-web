import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchChefPage } from './search-chef.page';

const routes: Routes = [
  {
    path: '',
    component: SearchChefPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchChefPageRoutingModule {}
