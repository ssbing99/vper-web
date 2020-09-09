import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {AppConstant} from '../../constant/app.constant';
import {LoginResponseModel} from '../../models/login.model';
import {catchError, finalize, tap} from 'rxjs/operators';
import {ResponseModel} from '../../models/request.model';
import {throwError} from 'rxjs';
import {UtilService} from '../../services/util.service';
import {UploadRestService} from '../../services/api/upload.rest.service';
import {AlertService} from '../../services/alert.service';
import {UserRestService} from '../../services/api/user.rest.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-chef-layout',
  templateUrl: './uic-chef-layout.component.html'
})

export class UicChefLayoutComponent {
  user: LoginResponseModel;
  @Input() imageURI: any;
  @Input() displayImage: any;
  @Input() uploadImg: boolean = true;
  @Output() onHandleUpload: EventEmitter<any> = new EventEmitter();

  constructor(private utilService: UtilService,
              private uploadService: UploadRestService,
              private alertService: AlertService,
              private userRestService: UserRestService){}

  async ngOnInit() {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
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
                  this.displayImage = this.imageURI;
                  this.updateUserProfile();
                }else{
                  this.alertService.presentErrorAlert(message);
                }
              }),
              catchError((err) => throwError(err))
          ).subscribe();

        }else {
          this.alertService.presentErrorAlert(validMsg);
        }
      };

      img.src = reader.result.toString(); // This is the data URL
    };
  }

  updateUserProfile() {
    if(this.imageURI){
      this.user['user_image'] = this.utilService.replceImagePath(this.user['user_image']);
      this.displayImage = this.userImage;
    }
    this.userRestService.upDateUserDetail(this.user).pipe(
        tap((res: ResponseModel<any>) => {
          if(res.status == 200){
            this.user = res.data;
            // this.alertService.presentSuccessAlert(res.message);
          }
        }),
        // finalize(() => this.loadingService.dismiss())
    ).subscribe(async () => {
      await StorageService.setItem(AppConstant.USER_KEY, this.user);
      this.user = await StorageService.getItem(AppConstant.USER_KEY);
    });

  }
}
