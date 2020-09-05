import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessConceptPage } from './business-concept.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessConceptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessConceptPageRoutingModule {}
