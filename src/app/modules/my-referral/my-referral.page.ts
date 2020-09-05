import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {LoginResponseModel} from "../../shared/models/login.model";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {DishRestService} from "../../shared/services/api/dish.rest.service";
import {tap} from "rxjs/operators";
import {ResponseModel} from "../../shared/models/request.model";
import {GetReferralRequestModel} from "../../shared/models/booking.model";

@Component({
  selector: 'app-my-referral',
  templateUrl: './my-referral.page.html',
  styleUrls: ['./my-referral.page.scss'],
})
export class MyReferralPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  loading = false;
  referralListing: Array<GetReferralRequestModel> = [];

  constructor(protected injector: Injector, private dishRestService: DishRestService,) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    console.log(this.user);
    if (!!this.user) {
      const { user_referal_code = '' } = this.user;
      this.dishRestService.getChefReferralData({ referal_code: user_referal_code })
          .pipe(
              tap((res: ResponseModel<Array<GetReferralRequestModel>>) => {
                const { data = [] } = res;
                this.referralListing = data;
              })
          )
          .subscribe();
    }
  }

}
