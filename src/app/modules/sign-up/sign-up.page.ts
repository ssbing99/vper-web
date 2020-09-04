import {Component, Injector, NgZone, OnInit} from '@angular/core';
import {BasePageComponent} from 'src/app/core/components/base-page/base-page.component';
import {AppLoginModalComponent} from 'src/app/core/components/login-modal/login-modal.component';
import {ModalController} from '@ionic/angular';
import {ChefSignUpRequestModel} from '../../shared/models/user.modal';
import {AlertService} from '../../shared/services/alert.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchValidator} from '../../shared/validators/match.validator';
import {AuthRestService} from '../../shared/services/api/auth.rest.service';
import {finalize, tap} from 'rxjs/operators';
import {LoadingService} from '../../shared/services/loading.service';
import {ResponseModel} from '../../shared/models/request.model';
import {TranslateService} from '@ngx-translate/core';

declare var google;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage extends BasePageComponent implements OnInit {
  isUserSubmit = false;
  isChefSubmit = false;
  Geocoder: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems = [];

  userSignupForm: FormGroup = this.fb.group({
    fname: ['', [Validators.required]],
    lname: [''],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
    phone: ['', [Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required]]
  }, {validators: matchValidator('password', 'confirmPassword')});

  chefSignupForm: FormGroup = this.fb.group({
    fname: ['', [Validators.required]],
    lname: [''],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')]],
    phone: ['', [Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required]],
    address: ['', [Validators.required]],
    refral_code: ['']
  });

  chefParams: ChefSignUpRequestModel = {
    latitude: -1,
    longitude: -1,
  };

  constructor(protected injector: Injector,
              private modalCtrl: ModalController,
              private alertService: AlertService,
              private fb: FormBuilder,
              private authRestService: AuthRestService,
              private loadingService: LoadingService,
              private zone: NgZone,
              private translateService: TranslateService) {
    super(injector);
    this.Geocoder = new google.maps.Geocoder();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  control(form: FormGroup, name: string): AbstractControl {
    return form.controls[name];
  }

  ngOnInit() {
  }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: AppLoginModalComponent,
      cssClass: 'login-modal'
    });

    return await modal.present();
  }

  userRegister() {
    this.isUserSubmit = true;
    if (this.userSignupForm.valid) {
      this.loadingService.presentLoading().then(() => {
        this.authRestService.userSignUp({
          fname: this.userSignupForm.controls.fname.value,
          lname: this.userSignupForm.controls.lname.value,
          email: this.userSignupForm.controls.email.value,
          phone: this.userSignupForm.controls.phone.value,
          password: this.userSignupForm.controls.password.value
        }).pipe(
          tap((res: ResponseModel<any>) => {
            if (res.status === 200) {
              Object.keys(this.userSignupForm.controls).forEach(control => {
                this.userSignupForm.controls[control].clearValidators();
                this.userSignupForm.controls[control].updateValueAndValidity();
              });
              this.userSignupForm.reset();
              this.alertService.presentSuccessAlert(res.message);
            }
          }),
          finalize(() => this.loadingService.dismiss())
        ).subscribe();
      });
    }
  }

  chefRegister() {
    this.isChefSubmit = true;
    if (this.chefSignupForm.valid) {
      this.loadingService.presentLoading().then(() => {
        this.authRestService.chefSignUp({
          fname: this.chefSignupForm.controls.fname.value,
          lname: this.chefSignupForm.controls.lname.value,
          email: this.chefSignupForm.controls.email.value,
          phone: this.chefSignupForm.controls.phone.value,
          address: this.chefSignupForm.controls.address.value,
          password: this.chefSignupForm.controls.password.value,
          latitude: this.chefParams.latitude,
          longitude: this.chefParams.longitude,
          refral_code: this.chefSignupForm.controls.refral_code.value
        }).pipe(
          tap((res: ResponseModel<any>) => {
            if (res.status === 200) {
              Object.keys(this.chefSignupForm.controls).forEach(control => {
                this.chefSignupForm.controls[control].clearValidators();
                this.chefSignupForm.controls[control].updateValueAndValidity();
              });
              this.chefSignupForm.reset();
              this.alertService.presentSuccessAlert(res.message);
            }
          }),
          finalize(() => this.loadingService.dismiss())
        ).subscribe();
      });
    }
  }

  updateSearchResults(event) {
    this.chefParams.latitude = -1;
    this.chefParams.longitude = -1;
    if (event.target.value === '') {
      this.autocompleteItems = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions({ input: event.target.value },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if (predictions != null) {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          }
        });
      },
      (error) => {
        this.alertService.presentErrorAlert(this.translateService.instant('error'));
      }
    );
  }

  selectItem(item) {
    this.Geocoder.geocode({
      address: item.description
    }, (result, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.chefParams.latitude = result[0].geometry.location.lat();
        this.chefParams.longitude = result[0].geometry.location.lng();

        this.chefSignupForm.controls.address.setValue(item.description);
        this.zone.run(() => {
          this.autocompleteItems = [];
        });
      }
    });
  }
}
