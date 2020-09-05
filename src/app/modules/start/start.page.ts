import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {LoginResponseModel} from "../../shared/models/login.model";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage extends BasePageComponent implements OnInit {
    user: LoginResponseModel;
    loading = false;

    constructor(protected injector: Injector, private router: Router) {
        super(injector);
    }

    async ngOnInit(): Promise<void> {
        this.user = await StorageService.getItem(AppConstant.USER_KEY);
    }

    redirectToMemberUpgradePage() {
        /*TODO set router link redirect to member upgrade*/
        this.router.navigate(['/member-upgrade']).catch(() => {
            alert('Failed to redirect.');
        }).then();
    }
}
