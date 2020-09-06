import { Component, OnInit } from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {LoginResponseModel} from "../../shared/models/login.model";

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  loading = false;

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
  }

}
