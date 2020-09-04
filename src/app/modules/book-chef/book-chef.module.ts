import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookChefPageRoutingModule } from './book-chef-routing.module';

import { BookChefPage } from './book-chef.page';
import {UicFooterComponentModule} from '../../shared/components/uic-footer/uic-footer.component.module';
import {TranslateModule} from '@ngx-translate/core';
import {UicStripeElementComponentModule} from '../../shared/components/uic-stripe-element/uic-stripe-element.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookChefPageRoutingModule,
    UicFooterComponentModule,
    TranslateModule.forChild(),
    UicStripeElementComponentModule
  ],
  declarations: [BookChefPage]
})
export class BookChefPageModule {}
