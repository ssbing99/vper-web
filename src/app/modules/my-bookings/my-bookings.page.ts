import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from '../../core/components/base-page/base-page.component';
import {LoginResponseModel} from '../../shared/models/login.model';
import {BookingDetailsModel} from '../../shared/models/booking.model';
import {StorageService} from '../../shared/services/storage.service';
import {AppConstant} from '../../shared/constant/app.constant';
import {finalize, tap} from 'rxjs/operators';
import {ResponseModel} from '../../shared/models/request.model';
import {DishRestService} from '../../shared/services/api/dish.rest.service';
import {ModalController} from '@ionic/angular';
import {UicPastChatModalComponent} from '../../shared/components/uic-past-chat-modal/uic-past-chat-modal.component';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  bookingList: BookingDetailsModel[] = [];
  loading = false;

  constructor(protected injector: Injector,
              private dishRestService: DishRestService,
              private modalCtrl: ModalController) {
    super(injector);
  }

  async ngOnInit() {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    await this.getBookingData('current');
  }

  async getBookingData(type: string) {
    this.bookingList = [];
    const today = new Date();
    this.loading = true;
    if (type === 'current') {
      today.setHours(0, 0, 0, 0);
      this.dishRestService.getCurrentChefBooking({
        chef_id: this.user.id,
        datetime: today
      }).pipe(
        tap((res: ResponseModel<BookingDetailsModel[]>) => this.setBookData(res.data)),
        finalize(() => this.loading = false)
      ).subscribe();
    } else {
      today.setHours(0, 0, 0, 0);
      this.dishRestService.getPastChefBooking({
        chef_id: this.user.id,
        datetime: today
      }).pipe(
        tap((res: ResponseModel<BookingDetailsModel[]>) => this.setBookData(res.data)),
        finalize(() => this.loading = false)
      ).subscribe();
    }
  }

  private setBookData(result: BookingDetailsModel[]) {
    if (result != null) {
      result.forEach(data => {
        data.bookingDate = Date.parse(data.book_date + ' ' + data.book_time + ' GMT');
        if (isNaN(data.bookingDate)) {
          const tempDate = data.book_date.split('-');
          data.book_date = tempDate[1] + '/' + tempDate[2] + '/' + tempDate[0];
          data.bookingDate = Date.parse(data.book_date + ' ' + data.book_time + ' GMT');
        }

        if (data.discount_ammount != null && Number(data.discount_ammount) > 0) {
          data.bookingFee = data.discount_ammount;
        } else {
          data.bookingFee = data.total_price;
        }
      });

      this.bookingList = result;
    }
  }

  async showChat(bookDetails: BookingDetailsModel) {
    const modal = await this.modalCtrl.create({
      component: UicPastChatModalComponent,
      cssClass: 'login-modal',
      componentProps: {
        toUserId: bookDetails.user_id,
        orderId: bookDetails.id,
      }
    });

    return await modal.present();
  }
}
