import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from 'src/app/core/components/base-page/base-page.component';
import {LoginResponseModel} from '../../shared/models/login.model';
import {StorageService} from '../../shared/services/storage.service';
import {AppConstant} from '../../shared/constant/app.constant';
import {DishRestService} from '../../shared/services/api/dish.rest.service';
import {finalize, tap} from 'rxjs/operators';
import {ResponseModel} from '../../shared/models/request.model';
import {BookingDetailsModel} from '../../shared/models/booking.model';
import {AlertController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {UicPastChatModalComponent} from '../../shared/components/uic-past-chat-modal/uic-past-chat-modal.component';
import {EventConstant} from '../../shared/constant/event.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends BasePageComponent implements OnInit {
  user: LoginResponseModel;
  bookingList: BookingDetailsModel[] = [];
  loading = false;
  index = 0;

  constructor(protected injector: Injector,
              private dishRestService: DishRestService,
              private router: Router,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) {
    super(injector);
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.index = this.router.getCurrentNavigation().extras.state.index;
    }
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
      this.dishRestService.getCurrentUserBooking({
        user_id: this.user.id,
        datetime: today
      }).pipe(
        tap((res: ResponseModel<BookingDetailsModel[]>) => this.setBookData(res.data)),
        finalize(() => this.loading = false)
      ).subscribe();
    } else {
      today.setHours(0, 0, 0, 0);
      this.dishRestService.getPastUserBooking({
        user_id: this.user.id,
        datetime: today
      }).pipe(
        tap((res: ResponseModel<BookingDetailsModel[]>) => this.setBookData(res.data)),
        finalize(() => this.loading = false)
      ).subscribe();
    }
  }

  async openDetails(bookDetails: BookingDetailsModel) {
    if (bookDetails.isReviewed) {
      await this.showChat(bookDetails);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Select an option',
        inputs: [
          {
            type: 'radio',
            label: 'Open Chat',
            value: '0'
          },
          {
            type: 'radio',
            label: 'Give Review',
            value: '1'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: async (val) => {
              switch (val) {
                case '0':
                  await this.showChat(bookDetails);
                  break;
                case '1':
                  // TODO Review
                  break;
              }
            }
          }
        ]
      });

      await alert.present();
    }
  }

  async showChat(bookDetails: BookingDetailsModel) {
    const modal = await this.modalCtrl.create({
      component: UicPastChatModalComponent,
      cssClass: 'login-modal',
      componentProps: {
        toUserId: bookDetails.chef_id,
        orderId: bookDetails.id,
      }
    });

    return await modal.present();
  }

  async logout() {
    await StorageService.removeItem(AppConstant.USER_KEY);
    await StorageService.removeItem(AppConstant.USER_TYPE_KEY);
    await StorageService.removeItem(AppConstant.IS_LOGIN_KEY);
    this.eventService.publish(EventConstant.IS_LOGIN, false);

    this.router.navigate(['/']);
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

}
