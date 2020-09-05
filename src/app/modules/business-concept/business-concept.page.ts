import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {LoginResponseModel} from "../../shared/models/login.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-business-concept',
  templateUrl: './business-concept.page.html',
  styleUrls: ['./business-concept.page.scss'],
})
export class BusinessConceptPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;

  constructor(protected injector: Injector, private router: Router) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
  }

  activatePage() {
    /*TODO set router link redirect to member upgrade*/
    this.router.navigate(['/member-upgrade']).catch(() => {
      alert('Failed to redirect.');
    }).then();
  }
}
