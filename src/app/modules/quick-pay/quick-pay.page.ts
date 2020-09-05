import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {LoginResponseModel} from "../../shared/models/login.model";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {tap} from "rxjs/operators";
import {ResponseModel} from "../../shared/models/request.model";
import {AuthRestService} from "../../shared/services/api/auth.rest.service";

@Component({
  selector: 'app-quick-pay',
  templateUrl: './quick-pay.page.html',
  styleUrls: ['./quick-pay.page.scss'],
})
export class QuickPayPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  loading = false;
  weekPay: any = [];

  constructor(protected injector: Injector, private authRestService: AuthRestService) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    if (!!this.user) {
      const { id = '' } = this.user;
      this.authRestService.getWalletDetailUser({ user_id: id})
          .pipe(
              tap((res: ResponseModel<any>) => {
                if (!!res) {
                  const { data = [] } = res;
                  this.weekPay = data;
                }
              })
          )
          .subscribe();
    }
  }

}