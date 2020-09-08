import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {AppConstant} from '../../constant/app.constant';
import {LoginResponseModel} from '../../models/login.model';

@Component({
  selector: 'app-chef-layout',
  templateUrl: './uic-chef-layout.component.html'
})

export class UicChefLayoutComponent {
  user: LoginResponseModel;
  @Input() imageURI: any;
  @Input() displayImage: any;
  @Input() uploadImg: boolean = false;
  @Output() onHandleUpload: EventEmitter<any> = new EventEmitter();

  async ngOnInit() {
    this.user = await StorageService.getItem(AppConstant.USER_KEY);
  }

  onSelectFile($event){
    this.onHandleUpload.emit($event);
  }
}
