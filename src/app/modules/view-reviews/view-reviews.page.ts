import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {DishRestService} from "../../shared/services/api/dish.rest.service";
import {LoginResponseModel} from "../../shared/models/login.model";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {finalize, tap} from "rxjs/operators";
import {ResponseModel} from "../../shared/models/request.model";

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.page.html',
  styleUrls: ['./view-reviews.page.scss'],
})
export class ViewReviewsPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  loading = true;
  page: number=0;
  reviews: Array<any> = [];

  constructor(protected injector: Injector, private dishRestService: DishRestService) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    this.getReviews();
  }

  getReviews() {
    if (!!this.user) {
      const { id = '' } = this.user;
      this.dishRestService.getChefReview({ chef_id: id, page: this.page })
          .pipe(
              tap((res: ResponseModel<any>) => {
                if (!!res) {
                  const { data = {} } = res;
                  const { review = [] } = data;
                  this.reviews = review;
                }
              }),
              finalize(() => this.loading = false)
          )
          .subscribe();
    }
  }


}
