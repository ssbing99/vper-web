import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from '../../core/components/base-page/base-page.component';
import {AuthRestService} from '../../shared/services/api/auth.rest.service';
import {StorageService} from '../../shared/services/storage.service';
import {AppConstant} from '../../shared/constant/app.constant';
import {LoginResponseModel} from '../../shared/models/login.model';
import {tap} from 'rxjs/operators';
import {ResponseModel} from '../../shared/models/request.model';
import {CommonTips} from '../../shared/models/chef.model';

@Component({
  selector: 'app-common-tips',
  templateUrl: './common-tips.page.html',
  styleUrls: ['./common-tips.page.scss'],
})
export class CommonTipsPage extends BasePageComponent implements OnInit {
  tips: CommonTips[] = [];
  user: LoginResponseModel = null;

  constructor(protected injector: Injector,
              private authRestService: AuthRestService) {
    super(injector);
  }

  async ngOnInit() {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    this.authRestService.getChefCommonTips({
      chef_id: this.user ? this.user.id : ''
    }).pipe(
      tap((res: ResponseModel<CommonTips[]>) => this.tips = res.data)
    ).subscribe();
  }

}
