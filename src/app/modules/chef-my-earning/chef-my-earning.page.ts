import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {LoginResponseModel} from "../../shared/models/login.model";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {DishRestService} from "../../shared/services/api/dish.rest.service";
import {delay, finalize, tap} from "rxjs/operators";

@Component({
  selector: 'app-chef-my-earning',
  templateUrl: './chef-my-earning.page.html',
  styleUrls: ['./chef-my-earning.page.scss'],
})
export class ChefMyEarningPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  loading = true;
  Arr = Array;

  arrIncome: Array<any> = [];
  last = false;
  totalPage = 1;
  totalIncome = 0;

  params: any = {
    page: 1
  };


  constructor(protected injector: Injector, private dishRestService: DishRestService) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    this.getTotalIncome();
  }

  getTotalIncome() {
    if (!!this.user) {
      this.loading = true;
      const { id = '' } = this.user;
      this.dishRestService.getTotalIncomeData({chef_id: id, ...this.params })
          .pipe(
              tap((res: any) => {
                const { bookdata = {}, data = [], totalpage = 1 } = res;
                const { TotalIncome = 0 } = bookdata; // {"TotalOrder":44,"TotalIncome":8796}
                this.totalIncome = TotalIncome;
                this.totalPage = totalpage;

                if (data.length > 0){
                  this.arrIncome = data;
                  this.last=false;
                } else {
                  this.last=true;
                }
              }),
              finalize(() => this.loading = false)
          )
          .subscribe();
    }
  }

  goPreviousList() {
    if (this.params.page === 0) {
      return;
    }
    this.params.page--;
    this.getTotalIncome();
  }

  getNewList(index: number) {
    if (this.params.page === index) {
      return;
    }
    this.params.page = index;
    this.getTotalIncome();
  }

  goNextList() {
    if (this.params.page + 1 === this.totalPage) {
      return;
    }
    this.params.page++;
    this.getTotalIncome();
  }

}
