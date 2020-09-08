import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from 'src/app/core/components/base-page/base-page.component';
import {LoginResponseModel} from '../../shared/models/login.model';
import {StorageService} from '../../shared/services/storage.service';
import {AppConstant} from '../../shared/constant/app.constant';
import {DishRestService} from '../../shared/services/api/dish.rest.service';
import {catchError, finalize, tap} from 'rxjs/operators';
import {ResponseModel} from '../../shared/models/request.model';
import {BookingDetailsModel} from '../../shared/models/booking.model';
import {AlertController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {UicPastChatModalComponent} from '../../shared/components/uic-past-chat-modal/uic-past-chat-modal.component';
import {EventConstant} from '../../shared/constant/event.constant';
import { UserAccountRequestModel } from 'src/app/shared/models/user.modal';
import { UserRestService } from 'src/app/shared/services/api/user.rest.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UicUserTermsModalComponent } from 'src/app/shared/components/uic-user-terms-modal/uic-user-terms-modal.component';
import { LanguageService } from 'src/app/shared/services/language.service';
import {UicShareLinkModalComponent} from '../../shared/components/uic-share-link-modal/uic-share-link-modal.component';
import {FormControl, FormGroup} from '@angular/forms';
import {of, throwError} from 'rxjs';
import {UtilService} from '../../shared/services/util.service';
import {UploadRestService} from '../../shared/services/api/upload.rest.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends BasePageComponent implements OnInit {
  currLng: any;
  user: LoginResponseModel;
  profile: UserAccountRequestModel = {};
  push_setting: string;
  bookingList: BookingDetailsModel[] = [];
  loading = false;
  index = 0;
  shareLink: any;
  imageURI: any;
  showImage: any;
  fname: string;
  lname: string;
  phone: string;
  public oldPass: any = '';
  public newPass: any = '';
  public confirmPass: any = '';
  profileForm = new FormGroup({
    fname: new FormControl(undefined),
    lname: new FormControl(undefined),
    phone: new FormControl(undefined),
    image: new FormControl(''),
    id: new FormControl(undefined),
  });

  constructor(protected injector: Injector,
              private utilService: UtilService,
              private uploadService: UploadRestService,
              private dishRestService: DishRestService,
              private userRestService: UserRestService,
              private router: Router,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private languageService: LanguageService) {
    super(injector);
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.index = this.router.getCurrentNavigation().extras.state.index;
    }

  }

  async ngOnInit() {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    this.push_setting=this.user['push_notification_settings'];
    this.currLng = this.languageService.getCurrentLanguage();
    this.userRestService.getUserDetail(this.user.id).pipe(
        tap((res: ResponseModel<UserAccountRequestModel>) => {
          this.profile = res.data;
          this.user = res.data;
          this.user.push_notification_settings = this.push_setting;
          this.imageURI = this.user.user_image;
          this.showImage = this.user.user_image;
          console.log(this.user);
        }),
        finalize(() => {
          this.profileForm.patchValue({
            fname: this.user.fname,
            lname: this.user.lname,
            phone: this.user.phone,
            image: this.user.user_image,
            id: this.user.id,
          });
        })
    ).subscribe();
    // this.userRestService.getAppShareUrl().pipe(
    //     tap((res: ResponseModel<any>) => {
    //       if(res.status == 200){
    //         this.shareLink = res.data;
    //       }
    //     })
    // ).subscribe();

    await this.getBookingData('current');
  }

  handleUpload(event, fileData?: any) {
    const file = event ? event.target.files[0] : fileData;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let img = new Image();
      let width:number, height:number;
      let validMsg;

      img.onload = async () => {
        width = img.width;
        height = img.height;

        validMsg = await this.utilService.validateUploadFile(file, width, height);

        if(validMsg == null){
          this.uploadService.uploadImage(file,"2").pipe(
              tap((res: ResponseModel<any>) => {
                    const { data = null, message } = res;
                    if(data!=null && !!data.imagePath) {
                      this.imageURI = data.imagePath;
                      this.showImage = this.imageURI;
                    }else{
                      this.alertService.presentErrorAlert(message);
                    }
              }),
              catchError((err) => throwError(err))
          ).subscribe();;

        }else {
          this.alertService.presentErrorAlert(validMsg);
        }
      };

      img.src = reader.result.toString(); // This is the data URL
    };
  }

  get userImage(): string {
    try {
      if (this.imageURI.indexOf(environment.serverUrl) < 0) {
        const fullURL = environment.serverUrl + '/' + this.imageURI;
        return fullURL
      } else {
        return this.imageURI;
      }
    } catch (e) {
      return '';
    }
  }

  updateUserProfile() {
    if(this.imageURI){
      this.profile['user_image'] = this.imageURI;
      this.showImage = this.imageURI;
    }

    const { fname, lname, phone } = this.profileForm.getRawValue();

    this.profile.fname = fname;
    this.profile.lname = lname;
    this.profile.phone = phone;

    this.loadingService.presentLoading().then(() => {
      this.userRestService.upDateCustomerDetail(this.profile).pipe(
        tap((res: ResponseModel<any>) => {
          if(res.status == 200){
            this.profile = res.data;
            this.user = res.data;
            this.alertService.presentSuccessAlert(res.message);
          }
        }),
        finalize(() => this.loadingService.dismiss())
      ).subscribe(async () => {
        await StorageService.setItem(AppConstant.USER_KEY, this.user);
        this.user = await StorageService.getItem(AppConstant.USER_KEY);
      });
    });

  }

  changePassword() {
    if (this.oldPass !== '' && this.newPass !== '' && this.confirmPass !== '') {
      if (this.newPass == this.confirmPass) {
        let params = {
          "user_id": this.user['id'],
          "old_pass": this.oldPass,
          "new_pass": this.newPass,
          "confirm_pass": this.confirmPass
        }
        this.loadingService.presentLoading().then(() => {
          this.userRestService.changePassword(params).pipe(
            tap((res: ResponseModel<any>) => {
              if (res.status == 200) {
                this.alertService.presentSuccessAlert(res.message);
              } else if (res.status == 201) {
              } else {
                this.alertService.presentErrorAlert("Something went wrong please try after some time!");
              }
            }),
            finalize(() => this.loadingService.dismiss())
          ).subscribe(() => {
            this.oldPass = '';
            this.newPass = '';
            this.confirmPass = '';
          });
        });
      } else {
        this.alertService.presentErrorAlert("New password and confirm password must be same");
      }
    } else {
      this.alertService.presentErrorAlert("Please fill all the field");
    }
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

  async showShareLink() {
    if(this.shareLink){
      const modal = await this.modalCtrl.create({
        component: UicShareLinkModalComponent,
        cssClass: 'login-modal',
        componentProps: {
          link: {
            title: 'Del App',
            link: this.shareLink.url
          }
        }
      });
      return await modal.present();
    }
  }

  async showPrivacy() {
    const modal = await this.modalCtrl.create({
      component: UicUserTermsModalComponent,
      cssClass: 'login-modal custom-modal-long-css'
    });
    return await modal.present();
  }

  async changeLanguage(lng: string){
    this.languageService.setLanguage(lng);
    this.currLng = this.languageService.getCurrentLanguage();
  }

  async updateNotification(status: string){
    if(status){
      let params = {
        "user_id" : this.user.id,
        "push_notification_settings": (status && status == '1' ? AppConstant.NOTIFICATION_YES : AppConstant.NOTIFICATION_NO)
      };
      this.loadingService.presentLoading().then(() => {
        this.userRestService.changePushSetting(params).pipe(
            tap((res: ResponseModel<any>) => {
              if(res.status == 200){
                this.user.push_notification_settings = params.push_notification_settings.toString();
                this.alertService.presentSuccessAlert("Update "+ res.message);
              }else{
                this.alertService.presentErrorAlert(res.message);
              }
            }),
            finalize(() => this.loadingService.dismiss())
        ).subscribe(async () => {
          await StorageService.setItem(AppConstant.USER_KEY, this.user);
          this.user = await StorageService.getItem(AppConstant.USER_KEY);
        });
      });

    }

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
