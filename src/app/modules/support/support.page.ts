import { Component, OnInit } from '@angular/core';
import {LoginResponseModel} from "../../shared/models/login.model";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {BasePageComponent} from "../../core/components/base-page/base-page.component";

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  loading = false;

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
  }

}
