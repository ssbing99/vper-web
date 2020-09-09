import {AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {DishRestService} from "../../shared/services/api/dish.rest.service";
import {AlertService} from "../../shared/services/alert.service";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {LoginResponseModel} from "../../shared/models/login.model";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UploadRestService} from "../../shared/services/api/upload.rest.service";
import {environment} from "../../../environments/environment";
import {catchError, finalize, tap} from "rxjs/operators";
import {LoadingService} from "../../shared/services/loading.service";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.page.html',
  styleUrls: ['./add-dish.page.scss'],
})
export class AddDishPage extends BasePageComponent implements OnInit, AfterViewInit {
  user: LoginResponseModel;
  isEdit = false;
  editDishInfo: any;
  loading = false;

  dishForm = new FormGroup({
    name: new FormControl(undefined),
    status: new FormControl('1'),
    grocerie: new FormControl(undefined),
    image: new FormControl(undefined),
    id: new FormControl(undefined),
  });

  constructor(protected injector: Injector,
              private dishRestService: DishRestService,
              private alertService: AlertService,
              private uploadService: UploadRestService,
              private loadingService: LoadingService,
              private router: Router) {
    super(injector);
    try {
      const { editDish } = this.router.getCurrentNavigation().extras.state;
      this.isEdit = !!editDish;
      if (this.isEdit) {
        this.editDishInfo = editDish;
      }
    } catch (e) {}
  }

  async ngOnInit(): Promise<void> {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
  }

  ngAfterViewInit(): void {
    if (this.isEdit && this.editDishInfo) {
      const { name = '', status = 0, grocery = '', id, image } = this.editDishInfo;
      this.dishForm.patchValue({
        name: name,
        status: status,
        grocerie: grocery,
        image: image,
        id
      });
    }
  }

  saveDish() {
    if (this.validateDish() && this.user) {
      const { id = '' } = this.user;
      if (this.isEdit) {
        const { name, status, grocerie, image, id } = this.dishForm.getRawValue();
        this.dishRestService.updateChefDishDataWithUpload({ name, status, grocery: grocerie, image, id, user_id: this.user.id })
            .subscribe((res: any) => {
              const { status, ProfileStatus } = res;
              if (status == 200) {
                if (ProfileStatus == "Success") {
                  this.alertService.presentSuccessAlert('Dish updated successfully!').then();
                } else {
                  this.alertService.presentSuccessAlert('Dish updated successfullyate but can\'t update your show on profile status because already added 4 profile !').then();
                }
              }
            })
      } else {
        const { name, status, grocerie, image } = this.dishForm.getRawValue();
        this.dishRestService.addChefDishWithUpload({ name, status, grocerie, image, user_id: id })
            .subscribe((res: any) => {
              if (res.status == 200) {
                this.alertService.presentSuccessAlert('Dish added successfully!').then();
              }
            });
      }
    }
  }

  validateDish(): boolean {
    try {
      const { name } = this.dishForm.getRawValue();
      if (!name || name == undefined || name.trim().length <= 0) {
        throw new Error("Please Enter Dish Name.");
      }
      return true;
    } catch (e) {
      this.alertService.presentErrorAlert(e.message).then();
      return false;
    }
  }

  handleUpload(event, fileData?: any) {
    this.loadingService.presentLoading().then(() => this.loading = true)
    const file = event ? event.target.files[0] : fileData;
    this.uploadService.uploadImage(file, '1')
        .pipe(
          tap(res => {
            const { data: { imagePath } = { imagePath: ''}, message } = res;
            if (!!message) {
              this.alertService.presentErrorAlert(message).then();
            } else {
              if (!!imagePath) {
                this.dishForm.controls.image.setValue(imagePath);
              } else {
                this.alertService.presentErrorAlert('Failed to upload.').then();
              }
            }
          }),
          catchError(() => this.alertService.presentErrorAlert('Failed to upload.').then()),
          finalize(() => {
            this.loading = false;
            this.loadingService.dismiss();
          }))
        .subscribe();
  }

  get dishImage(): string {
    try {
      if (this.dishForm.controls.image.value.indexOf(environment.serverUrl) < 0) {
        const fullURL = environment.serverUrl + '/' + this.dishForm.controls.image.value;
        return fullURL
      } else {
        return this.dishForm.controls.image.value;
      }
    } catch (e) {
      return '';
    }
  }
}