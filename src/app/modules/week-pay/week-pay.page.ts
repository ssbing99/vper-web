import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {LoginResponseModel} from "../../shared/models/login.model";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {finalize, tap} from "rxjs/operators";
import {ResponseModel} from "../../shared/models/request.model";
import {AuthRestService} from "../../shared/services/api/auth.rest.service";

@Component({
  selector: 'app-week-pay',
  templateUrl: './week-pay.page.html',
  styleUrls: ['./week-pay.page.scss'],
})
export class WeekPayPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  loading = true;
  dataDisplay: Array<any> = [];
  weekPay: any=[];

  constructor(protected injector: Injector, private authRestService: AuthRestService) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    if (!!this.user) {
      const { id = '' } = this.user;
      this.authRestService.getWalletTotalAmmountTwoWeek({ user_id: id})
          .pipe(
              tap((res: ResponseModel<any>) => {
                if (!!res) {
                  const { data = [] } = res;
                  this.weekPay = data;

                  this.weekPay.forEach(data => {
                    // Insert new date range period into empty array
                    if (this.dataDisplay.length === 0) {
                      this.insertNewDatePeriod(data);
                    } else {
                      let found = false;

                      // Push new date in same date range period
                      this.dataDisplay.forEach(display => {
                        if (data.startDate + ' - ' + data.endDate === display.datePeriod) {
                          found = true;

                          display.total += Number(data.total);
                          display.breakdown.push({
                            date: data.cp_date,
                            earning: Number(data.total)
                          });
                        }
                      });

                      // Insert new date range period
                      if (!found) {
                        this.insertNewDatePeriod(data);
                      }
                    }
                  });
                }
              }),
              finalize(() => this.loading = false)
          )
          .subscribe();
    }
  }

  private insertNewDatePeriod(data: any) {
    let breakdown = [];
    breakdown.push({
      date: data.cp_date,
      earning: Number(data.total),
      showBreakdown: false
    });
    this.dataDisplay.push({
      datePeriod: data.startDate + ' - ' + data.endDate,
      total: Number(data.total),
      breakdown
    });
  }
}
