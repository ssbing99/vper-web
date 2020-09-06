import {AfterViewInit, Component, Injector, OnInit} from '@angular/core';
import {BasePageComponent} from "../../core/components/base-page/base-page.component";
import {DishRestService} from "../../shared/services/api/dish.rest.service";
import {AlertService} from "../../shared/services/alert.service";
import {StorageService} from "../../shared/services/storage.service";
import {AppConstant} from "../../shared/constant/app.constant";
import {LoginResponseModel} from "../../shared/models/login.model";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.page.html',
  styleUrls: ['./add-dish.page.scss'],
})
export class AddDishPage extends BasePageComponent implements OnInit, AfterViewInit {
  user: LoginResponseModel;
  isEdit = false;
  editDishInfo: any;

  dishForm = new FormGroup({
    name: new FormControl(undefined),
    status: new FormControl('1'),
    grocerie: new FormControl(undefined),
    image: new FormControl(''),
    id: new FormControl(undefined),
  });

  constructor(protected injector: Injector,
              private dishRestService: DishRestService,
              private alertService: AlertService,
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
    console.log(this.editDishInfo);
    if (this.isEdit && this.editDishInfo) {
      const { name = '', status = 0, grocery = '', id, image } = this.editDishInfo;
      this.dishForm.patchValue({
        name: name,
        status: status,
        grocerie: grocery,
        id
      });
      if (!!image && image.length > 0) {
        this.getBase64ImageFromUrl(image)
            .then(result => this.dishForm.get('image').setValue(result))
            .catch(err => console.error(err));
      }
    }
  }

  saveDish() {
    if (this.validateDish() && this.user) {
      const { id = '' } = this.user;
      if (this.isEdit) {
        const { name, status, grocerie, image, id } = this.dishForm.getRawValue();
        this.dishRestService.updateDish({ name, status, grocery: grocerie, image, id, user_id: this.user.id })
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
        this.dishRestService.saveDish({ name, status, grocerie, image, user_id: id })
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
    const file = event ? event.target.files[0] : fileData;
    console.log(fileData);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.dishForm.get('image').setValue(reader.result);
    };
  }

  async getBase64ImageFromUrl(imageUrl) {
    let res = await fetch(imageUrl);
    let blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }
}

export interface DishRequestModel {
  name?: string;
  image?: string;
  status?: number;
  grocerie?: string;
  id?: number;
}
