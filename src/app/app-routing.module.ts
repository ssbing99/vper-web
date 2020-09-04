import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './shared/guard/auth.guard';
import {AppConstant} from './shared/constant/app.constant';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule),
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./modules/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.USER_TYPE
    }
  },
  {
    path: 'search-chef',
    loadChildren: () => import('./modules/search-chef/search-chef.module').then( m => m.SearchChefPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.USER_TYPE
    }
  },
  {
    path: 'chef-details/:id',
    loadChildren: () => import('./modules/chef-details/chef-details.module').then( m => m.ChefDetailsPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.USER_TYPE
    }
  },
  {
    path: 'book-chef/:id',
    loadChildren: () => import('./modules/book-chef/book-chef.module').then( m => m.BookChefPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.USER_TYPE
    }
  },
  {
    path: 'my-bookings',
    loadChildren: () => import('./modules/my-bookings/my-bookings.module').then( m => m.MyBookingsPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'common-tips',
    loadChildren: () => import('./modules/common-tips/common-tips.module').then( m => m.CommonTipsPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
