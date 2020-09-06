import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {LoginResponseModel} from "../../shared/models/login.model";
import {DishRestService} from "../../shared/services/api/dish.rest.service";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {finalize, tap} from "rxjs/operators";
import {AlertService} from "../../shared/services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chef-choice',
  templateUrl: './chef-choice.page.html',
  styleUrls: ['./chef-choice.page.scss'],
})
export class ChefChoicePage extends BasePageComponent implements OnInit {
  Arr = Array;
  user: LoginResponseModel;
  loading = true;
  chefChoices: Array<any> = [];

  // paging props
  totalPage = 0;
  params: any = {
    page: 1
  };

  constructor(protected injector: Injector,
              private dishRestService: DishRestService,
              private alertService: AlertService,
              private router: Router) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    this.getChefDishData();
  }

  getChefDishData() {
    if (!!this.user) {
      const { id = '' } = this.user;
      this.dishRestService.getChefDishdata({ user_id: id, ...this.params })
          .pipe(
              tap((res: any) => {
                const { data = [], totalcountpage = 0 } = res;
                this.chefChoices = data;
                this.totalPage = totalcountpage;
              }),
              finalize(() => this.loading = false)
          )
          .subscribe();
    }
  }

  goPreviousList() {
    if (this.params.page === 1) {
      return;
    }
    this.params.page--;
    this.getChefDishData();
  }

  goNextList() {
    if (this.params.page + 1 === this.totalPage) {
      return;
    }
    this.params.page++;
    this.getChefDishData();
  }

  getNewList(index: number) {
    if (this.params.page === index) {
      return;
    }
    this.params.page = index;
    this.getChefDishData();
  }

  deleteDish(dishId: number) {
    if (!!dishId) {
      this.alertService.presentConfirmationAlert(
          'Confirm delete',
          'Are you sure you want delete this dish?',
          () => {
            if (!!this.user) {
              const { id = '' } = this.user;
              let params = { user_id: id, id: dishId };
              this.dishRestService.deleteDish(params).subscribe(() => this.getChefDishData());
            }
          }).then();
    }
  }

  addDish(dish: any) {
    if (!!dish) {
      this.router.navigate(['/add-dish'], { state: { editDish: dish } }).then();
    } else {
      this.router.navigate(['/add-dish']).then();
    }
  }
}
