import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookChefPage } from './book-chef.page';

const routes: Routes = [
  {
    path: '',
    component: BookChefPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookChefPageRoutingModule {}
