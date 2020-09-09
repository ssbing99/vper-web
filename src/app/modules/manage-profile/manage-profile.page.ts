import {Component, Injector, NgZone, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {LoginResponseModel} from "../../shared/models/login.model";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {catchError, finalize, tap} from 'rxjs/operators';
import {ResponseModel} from "../../shared/models/request.model";
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../../shared/services/loading.service';
import {AlertService} from '../../shared/services/alert.service';
import {UserRestService} from '../../shared/services/api/user.rest.service';
import {UserAccountRequestModel} from '../../shared/models/user.modal';
import {LanguageService} from '../../shared/services/language.service';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {UicChefTermsModalComponent} from '../../shared/components/uic-chef-terms-modal/uic-chef-terms-modal.component';
import {throwError} from 'rxjs';
import {UtilService} from '../../shared/services/util.service';
import {UploadRestService} from '../../shared/services/api/upload.rest.service';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
export class ManageProfilePage extends BasePageComponent implements OnInit {
  isSubmit = false;
  currLng: any;
  user: LoginResponseModel;
  profile: UserAccountRequestModel = {};
  Geocoder: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems = [];
  push_setting: string;
  loading = true;
  index = 0;
  page: number=0;
  reviews: Array<any> = [];
  imageURI: any;
  showImage: any;
  public country: any;
  public oldPass: any = '';
  public newPass: any = '';
  public confirmPass: any = '';
  profileForm = new FormGroup({
    fname: new FormControl(undefined, [Validators.required]),
    lname: new FormControl(undefined,),
    phone: new FormControl(undefined, [Validators.required]),
    country: new FormControl(undefined,[Validators.required, Validators.min(1)]),
    city: new FormControl(undefined,[Validators.required]),
    address: new FormControl(undefined,[Validators.required]),
    aboutMe: new FormControl(undefined),
    image: new FormControl(''),
    id: new FormControl(undefined),
  });

  chefParams: UserAccountRequestModel = {
    latitude: "-1",
    longitude: "-1",
  };

  constructor(protected injector: Injector,
              private utilService: UtilService,
              private uploadService: UploadRestService,
              private router: Router,
              private modalCtrl: ModalController,
              private userRestService: UserRestService,
              private loadingService: LoadingService,
              private languageService: LanguageService,
              private alertService: AlertService,
              private zone: NgZone,
              private translateService: TranslateService) {
    super(injector);
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.index = this.router.getCurrentNavigation().extras.state.index;
    }
    this.Geocoder = new google.maps.Geocoder();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  control(form: FormGroup, name: string): AbstractControl {
    return form.controls[name];
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
    this.push_setting=this.user['push_notification_settings'];
    this.currLng = this.languageService.getCurrentLanguage();
    this.userRestService.getUserDetail(this.user.id).pipe(
        tap((res: ResponseModel<UserAccountRequestModel>) => {
          this.profile = res.data;
          this.user = res.data;
          this.user.push_notification_settings = this.push_setting;
          // this.imageURI = this.user.user_image;
          // this.showImage = this.user.user_image;
          this.chefParams.latitude = this.user.latitude;
          this.chefParams.longitude = this.user.longitude;
        }),
        finalize(() => {
          this.profileForm.patchValue({
            fname: this.user.fname,
            lname: this.user.lname,
            phone: this.user.phone,
            country: (this.user.country ? parseInt(this.user.country) : 0),
            city: this.user.city,
            address: this.user.address,
            aboutMe: this.user.about_me,
            image: this.user.user_image,
            id: this.user.id,
          });
        })
    ).subscribe();

    this.userRestService.getCountry().pipe(
        tap((res: ResponseModel<any>) => {
          console.log("res", res);
          if(res.status == 200){
            this.country = res.data;
          }
        }),
    ).subscribe();
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
    this.isSubmit = true;
    if(this.profileForm.valid){
      if(this.imageURI){
        this.profile['user_image'] = this.imageURI;
        this.showImage = this.imageURI;
      }

      const { fname, lname, phone, country ,city, address, aboutMe } = this.profileForm.getRawValue();

      this.profile.fname = fname;
      this.profile.lname = lname;
      this.profile.phone = phone;
      this.profile.country = country;
      this.profile.city = city;
      this.profile.address = address;
      this.profile.about_me = aboutMe;
      this.profile.latitude = this.chefParams.latitude;
      this.profile.latitude =  this.chefParams.longitude,

      this.loadingService.presentLoading().then(() => {
        this.userRestService.upDateUserDetail(this.profile).pipe(
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

  async showPrivacy() {
    const modal = await this.modalCtrl.create({
      component: UicChefTermsModalComponent,
      cssClass: 'login-modal custom-modal-long-css'
    });
    return await modal.present();
  }

  async changeLanguage(lng: string){
    this.languageService.setLanguage(lng);
    this.currLng = this.languageService.getCurrentLanguage()
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

  changeCountry(e) {
    console.log(e);
    this.profileForm.controls.country.setValue(parseInt(e.target.value));
  }

  updateSearchResults(event) {
    // this.chefParams.latitude = -1;
    // this.user.longitude = -1;
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
        console.log(result[0]);
        this.chefParams.latitude = result[0].geometry.location.lat();
        this.chefParams.longitude = result[0].geometry.location.lng();

        this.profileForm.controls.address.setValue(item.description);
        this.zone.run(() => {
          this.autocompleteItems = [];
        });
      }
    });
  }

}
