import {Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from '../../core/components/base-page/base-page.component';
import {DishRestService} from '../../shared/services/api/dish.rest.service';
import {finalize, tap} from 'rxjs/operators';
import {ResponseModel} from '../../shared/models/request.model';
import {ChefAmountModel, ChefDetailsModel} from '../../shared/models/chef.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BookingModel, BookingRequestModel, CityModel, CouponResponseModel, StateModel} from '../../shared/models/booking.model';
import {AlertService} from '../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../../shared/services/storage.service';
import {AppConstant} from '../../shared/constant/app.constant';
import {LoadingService} from '../../shared/services/loading.service';
import {environment} from '../../../environments/environment';
import {Location} from '@angular/common';
import {NavController} from '@ionic/angular';
declare var jQuery: any;
declare var Stripe;

@Component({
  selector: 'app-book-chef',
  templateUrl: './book-chef.page.html',
  styleUrls: ['./book-chef.page.scss'],
})
export class BookChefPage extends BasePageComponent implements OnInit {

  constructor(protected injector: Injector,
              private dishRestService: DishRestService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private translateService: TranslateService,
              private loadingService: LoadingService,
              private router: Router,
              private location: Location,
              private navCtrl: NavController) {
    super(injector);
  }
  static selectedDate = '';
  static selectedTime = '';

  private container;
  index = 1;
  private bufferSpacing = 10;
  newCard = false;
  totalSteps = 8;
  totalDays = [1, 2, 3, 4, 5, 6];
  totalPersons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  totalAmount = 0;
  displayAmount = 0;
  couponCode = '';
  loading = false;
  oldCard = false;
  useNewCard = false;
  secretClient: string;
  savedCard = true;
  public stripe = Stripe(environment.stripeClientId);

  chefDetails: ChefDetailsModel;
  states: StateModel[] = [];
  cities: CityModel[] = [];
  bookingInfo: BookingModel;
  bookingParams: BookingRequestModel = {
    total_days: 0,
    total_person: [0, 0, 0, 0, 0, 0],
    chef_id: '',
    user_id: '',
    book_datetime: 0,
    booking_type: 0,
    address: {
      state: 0,
      address: '',
      city: 0,
      phone: '',
      postal_code: '',
      email: '',
      country: 164
    },
    dish_id: [],
    foodbox_menu_company: '',
    foodbox_menu: '',
    alergies: '',
    other: '',
    couponCode: '',
    couponData: null
  };

  paymentCallback = (savedCard, paymentMethodId) => {
    this.loadingService.presentLoading().then(() => {
      this.dishRestService.paymentHandler({
        order_id: this.bookingInfo.data,
        savedCard: this.savedCard,
        payment_method_id: paymentMethodId,
        user_id: this.bookingParams.user_id
      }).pipe(
        tap(res => {
          this.paymentHandlerResponse(res);
        }),
        finalize(() => this.loadingService.dismiss())
      ).subscribe();
    });
  }

  requireActionCallback = (savedCard, intentId) => {
    this.loadingService.presentLoading().then(() => {
      this.dishRestService.paymentActionCallbackHandler({
        order_id: this.bookingInfo.data,
        savedCard: this.savedCard,
        payment_intent_id: intentId,
        user_id: this.bookingParams.user_id
      }).pipe(
        tap(res => {
          this.paymentHandlerResponse(res);
        }),
        finalize(() => this.loadingService.dismiss())
      ).subscribe();
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const user = await StorageService.getItem(AppConstant.USER_KEY);
    this.bookingParams.user_id = user.id;
    this.bookingParams.chef_id = id;

    this.dishRestService.getChefDetailsById({
      userId: id
    }).pipe(
      tap((res: ResponseModel<ChefDetailsModel>) => {
        this.chefDetails = res.data;
      })
    ).subscribe();

    this.dishRestService.getState({
      Countryid: this.bookingParams.address.country
    }).pipe(
      tap((res: ResponseModel<StateModel[]>) => {
        this.states = res.data;
      })
    ).subscribe();

    this.container = document.getElementsByClassName('multisteps-form__form')[0];

    // tslint:disable-next-line:only-arrow-functions
    jQuery(document).ready(function() {
      BookChefPage.selectedDate = '';
      BookChefPage.selectedTime = '';

      jQuery('#date').bootstrapMaterialDatePicker({
        time: false,
        clearButton: true,
        format: 'YYYY-MM-DD',
        minDate: new Date()
        // tslint:disable-next-line:only-arrow-functions
      }).on('change', (e, date) => {
        BookChefPage.selectedDate = date.format('YYYY-MM-DD');
      });

      jQuery('#time').bootstrapMaterialDatePicker({
        date: false,
        shortTime: false,
        format: 'HH:mm'
        // tslint:disable-next-line:only-arrow-functions
      }).on('change', function(e, time) {
        BookChefPage.selectedTime = time.format('HH:mm:ss');
      });

      jQuery('#date-format').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY - HH:mm'
      });

      jQuery('#date-fr').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm',
        lang: 'fr',
        weekStart: 1,
        cancelText : 'ANNULER',
        nowButton : true,
        switchOnClick : true
      });

      jQuery('#date-end').bootstrapMaterialDatePicker({
        weekStart: 0, format: 'DD/MM/YYYY HH:mm'
      });

      jQuery('#date-start').bootstrapMaterialDatePicker({
        weekStart: 0,
        format: 'DD/MM/YYYY HH:mm',
        shortTime : true
        // tslint:disable-next-line:only-arrow-functions
      }).on('change', function(e, date) {
        jQuery('#date-end').bootstrapMaterialDatePicker('setMinDate', date);
      });

      jQuery('#min-date').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', minDate : new Date() });

      // jQuery.material.init();
    });
  }

  ionViewDidEnter(): void {
    const currentPanel = document.getElementsByClassName('multisteps-form__panel')[this.index - 1];
    this.container.setAttribute('style', 'height: ' + (currentPanel.clientHeight + this.bufferSpacing) + 'px');
  }

  goTo(index: number) {
    if (!this.loading) {
      let temp = index;
      if (this.totalSteps === 8 && index > 5) {
        temp = index + 1;
      }

      switch (temp) {
        case 2:
          this.updateContainerUI(index);
          setTimeout(() => {
            this.updateContainerHeight(index);
          }, 100);
          break;
        case 3:
          if (this.bookingParams.booking_type === 1 && this.bookingParams.dish_id.length === 0) {
            this.alertService.presentErrorAlert('Please select at least 1 dish.');
          } else {
            this.updateContainerUI(index);
            this.updateContainerHeight(index);
          }
          break;
        case 4:
          if (this.bookingParams.total_days === 0) {
            this.alertService.presentErrorAlert('Please select at least 1 dish.');
          } else {
            if (this.bookingParams.total_days > 1) {
              this.totalSteps = 9;
            } else {
              this.totalSteps = 8;
            }

            this.updateContainerUI(index);
            this.updateContainerHeight(index);
          }
          break;
        case 5:
          if (Number(this.bookingParams.total_person[0]) === 0) {
            this.alertService.presentErrorAlert('Please select at least 1 person.');
          } else {
            this.updateContainerUI(index);
            this.updateContainerHeight(index);
          }
          break;
        case 6:
          if (this.checkMultiplePerson(2, 1)) {
            if (this.checkMultiplePerson(3, 2)) {
              if (this.checkMultiplePerson(4, 3)) {
                if (this.checkMultiplePerson(5, 4)) {
                  if (this.checkMultiplePerson(6, 5)) {
                    this.updateContainerUI(index);
                    this.updateContainerHeight(index);
                  }
                }
              }
            }
          }
          break;
        case 8:
          if (this.checkValidAddress()) {
            this.dishRestService.getTotalChefAmount({
              totaldays: this.bookingParams.total_days,
              person: this.bookingParams.total_person
            }).pipe(
              tap((res: ChefAmountModel) => {
                this.totalAmount = Number(res.price);
                this.displayAmount = Number(res.price);
              })
            ).subscribe();

            this.updateContainerUI(index);
            this.updateContainerHeight(index);
          }
          break;
        case 9:
          if (BookChefPage.selectedDate === '') {
            this.alertService.presentErrorAlert('Please select your booking date');
            return;
          }

          if (BookChefPage.selectedTime === '') {
            this.alertService.presentErrorAlert('Please select your booking time');
            return;
          }

          const date = (BookChefPage.selectedDate + ' ' + BookChefPage.selectedTime).split(/[- :]/);
          // tslint:disable-next-line:radix max-line-length
          this.bookingParams.book_datetime = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(date[3]), parseInt(date[4]), parseInt(date[5])).getTime() / 1000;
          this.bookingParams.total_days = Number(this.bookingParams.total_days);
          const tempPerson = [];
          this.bookingParams.total_person.forEach(person => {
            tempPerson.push(Number(person));
          });
          this.bookingParams.total_person = tempPerson;

          this.loadingService.presentLoading().then(() => {
            this.dishRestService.bookChefNow(this.bookingParams).pipe(
              tap((res: BookingModel) => {
                if (res.data == null) {
                  this.alertService.presentErrorAlert(res.message);
                } else {
                  this.bookingInfo = res;
                  this.updateContainerUI(index);
                  this.updateContainerHeight(index);
                }
              }),
              finalize(() => {
                this.loadingService.dismiss();
              })
            ).subscribe();
          });
          break;
        default:
          this.updateContainerUI(index);
          this.updateContainerHeight(index);
      }
    }
  }

  selectStep1(userChoice: number) {
    this.bookingParams.booking_type = userChoice;
    switch (userChoice) {
      case 1:
        this.bookingParams.other = '';
        this.bookingParams.foodbox_menu = '';
        this.bookingParams.foodbox_menu_company = '';
        break;
      case 2:
        this.bookingParams.other = '';
        break;
      case 3:
        this.bookingParams.foodbox_menu_company = '';
        this.bookingParams.foodbox_menu = '';
        break;
    }
  }

  selectDish(dishId) {
    if (this.bookingParams.dish_id.indexOf(dishId) === -1) {
      this.bookingParams.dish_id.push(dishId);
    } else {
      const index: number = this.bookingParams.dish_id.indexOf(dishId);
      if (index !== -1) {
        this.bookingParams.dish_id.splice(index, 1);
      }
    }
  }

  selectCounty() {
    this.cities = [];
    this.dishRestService.getCity({
      Stateid: this.bookingParams.address.state.toString()
    }).pipe(
      tap((res: ResponseModel<CityModel[]>) => {
        this.cities = res.data;
      })
    ).subscribe();
  }

  validateCoupon() {
    this.bookingParams.couponData = null;
    if (this.couponCode !== '' && this.couponCode != null) {
      this.loading = true;
      this.loadingService.presentLoading().then(() => {
        this.dishRestService.validateCoupon({
          coupon_id: this.couponCode,
          amount: this.totalAmount.toString()
        }).pipe(
          tap((res: CouponResponseModel) => {
            if (res.data != null) {
              this.bookingParams.couponData = res.data;
              this.displayAmount = res.data.totalammount;
              this.bookingParams.couponCode = this.couponCode;
            } else {
              this.alertService.presentErrorAlert(this.translateService.instant('hire_chef.payment.invalid_coupon'));
            }
          }),
          finalize(() => {
            this.loadingService.dismiss();
            this.loading = false;
          })
        ).subscribe();
      });
    }
  }

  makePayment() {
    if (!this.newCard) {
      this.loadingService.presentLoading().then(() => {
        this.dishRestService.existCardPaymentHandler({
          order_id: this.bookingInfo.data,
          user_id: this.bookingParams.user_id,
          existCard: true,
          payment_method_id: this.bookingInfo.cardInfo.card_id
        }).pipe(
          tap(res => this.paymentHandlerResponse(res)),
          finalize(() => this.loadingService.dismiss())
        ).subscribe();
      });
    } else {
      // document.getElementById('payment-form').submit();
      // @ts-ignore
      document.getElementsByClassName('payment-button')[0].click();
    }
  }

  showPayment() {
    this.newCard = true;
    this.oldCard = false;
    this.useNewCard = true;

    setTimeout(() => {
      this.updateContainerHeight(this.index);
    }, 100);
  }

  useOldCard() {
    this.newCard = false;
    this.useNewCard = false;
    this.oldCard = true;

    setTimeout(() => {
      this.updateContainerHeight(this.index);
    }, 100);
  }

  cancelTransaction() {
    this.alertService.presentConfirmationAlert(
      'Confirm cancel order payment',
      'Are you sure you want cancel this order',
      () => this.location.back());
  }

  changeSaveCardOption() {
    this.savedCard = !this.savedCard;
  }

  getDishChecked(dishId: string) {
    return this.bookingParams.dish_id.indexOf(dishId) !== -1;
  }

  getIndex(index: number) {
    return this.totalSteps === 9 ? index : index - 1;
  }

  private updateContainerHeight(index: number) {
    const currentPanel = document.getElementsByClassName('multisteps-form__panel')[index - 1];
    currentPanel.classList.add('js-active');
    this.container.setAttribute('style', 'height: ' + (currentPanel.clientHeight + this.bufferSpacing) + 'px');
  }

  private updateContainerUI(index: number) {
    this.index = index;
    // Steps
    const steps = document.getElementsByClassName('multisteps-form__progress-btn');
    for (let i = 0; i < steps.length; i++) {
      steps.item(i).classList.remove('js-active');
    }

    for (let i = 0; i < steps.length; i++) {
      if (i <= index - 1) {
        steps.item(i).classList.add('js-active');
      }
    }

    // Panels
    const panels = document.getElementsByClassName('multisteps-form__panel');
    for (let i = 0; i < panels.length; i++) {
      panels.item(i).classList.remove('js-active');
    }
  }

  private checkMultiplePerson(day, personOfDay) {
    if (Number(this.bookingParams.total_days) >= day) {
      if (Number(this.bookingParams.total_person[personOfDay]) === 0) {
        this.alertService.presentErrorAlert('Please select at least 1 person on Day ' + day + '.');
        return false;
      }
    }

    return true;
  }

  private checkValidAddress() {
    if (this.bookingParams.address.address === '') {
      this.alertService.presentErrorAlert('Please enter your address');
      return false;
    }

    if (this.bookingParams.address.phone === '' || this.bookingParams.address.phone == null) {
      this.alertService.presentErrorAlert('Please enter your phone number');
      return false;
    }

    if (this.bookingParams.address.postal_code === '') {
      this.alertService.presentErrorAlert('Please enter your postal number');
      return false;
    }

    if (Number(this.bookingParams.address.country) === 0) {
      this.alertService.presentErrorAlert('Please enter your country');
      return false;
    }

    if (Number(this.bookingParams.address.state) === 0) {
      this.alertService.presentErrorAlert('Please enter your state');
      return false;
    }

    return  true;
  }

  private async paymentHandlerResponse(data) {
    if (data != null && data.status === 200) {
      if (data.requires_action) {
        if (!this.newCard) {
          this.stripe.handleCardAction(data.payment_intent_client_secret).then(async (res) => {
            if (res.error) {
              await this.alertService.presentErrorAlert(res.error.message);
            } else {
              this.requireActionCallback(false, res.paymentIntent.id);
            }
          }).catch(err => this.alertService.presentErrorAlert('There is an error with your card maybe invalid card detail or something else.'));
        } else {
          this.secretClient = data.payment_intent_client_secret;
        }
      } else if (data.type !== 'error') {
        await this.alertService.presentSuccessAlert('Kokk bestilt vellykket', () => this.navCtrl.navigateRoot('/search-chef'));
      } else {
        await this.alertService.presentErrorAlert(data.message);
      }
    } else {
      await this.alertService.presentErrorAlert(data.message);
    }
  }
}
