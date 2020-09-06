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
  {
    path: 'start-page',
    loadChildren: () => import('./modules/start/start.module').then(m => m.StartPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'referral',
    loadChildren: () => import('./modules/referral/referral.module').then( m => m.ReferralPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'my-referral',
    loadChildren: () => import('./modules/my-referral/my-referral.module').then( m => m.MyReferralPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'support',
    loadChildren: () => import('./modules/support/support.module').then( m => m.SupportPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'quick-pay',
    loadChildren: () => import('./modules/quick-pay/quick-pay.module').then( m => m.QuickPayPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'week-pay',
    loadChildren: () => import('./modules/week-pay/week-pay.module').then( m => m.WeekPayPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'chef-my-earning',
    loadChildren: () => import('./modules/chef-my-earning/chef-my-earning.module').then( m => m.ChefMyEarningPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'business-concept',
    loadChildren: () => import('./modules/business-concept/business-concept.module').then( m => m.BusinessConceptPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'view-reviews',
    loadChildren: () => import('./modules/view-reviews/view-reviews.module').then( m => m.ViewReviewsPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'chef-choice',
    loadChildren: () => import('./modules/chef-choice/chef-choice.module').then( m => m.ChefChoicePageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  },
  {
    path: 'add-dish',
    loadChildren: () => import('./modules/add-dish/add-dish.module').then( m => m.AddDishPageModule),
    canActivate: [AuthGuard],
    data: {
      role: AppConstant.CHEF_TYPE
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
