import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {AppConstant} from '../constant/app.constant';

@Injectable()
export class UtilService {

  private MAX_FILE_WIDTH = 1024;
  private MAX_FILE_HEIGHT = 768;
  private FILE_EXTENSION =
      [
          'png','jpg','jpeg','gif',
          'PNG','JPG','JPEG','GIF'
      ];

  constructor() {}

  async isLogged() {
    return await StorageService.getItem(AppConstant.IS_LOGIN_KEY);
  }

  async getUserType() {
    return await StorageService.getItem(AppConstant.USER_TYPE_KEY);
  }

  isAssetPath = (url: string): boolean => url.indexOf('assets') >= 0;

  async validateUploadFile(file: File, width:number, height:number){
    console.log("start", file, width, height);
    if(file && file != null && file != undefined){
      let fileExt = file.name.split(".").pop();

      if(this.FILE_EXTENSION.indexOf(fileExt) == -1)
        return "Supported file extension is png, jpg, and gif."
      else if(width > this.MAX_FILE_WIDTH || height > this.MAX_FILE_HEIGHT)
        return "Please upload an image with resolution 1024x768.";

      return null;
    }

    return "Please select image to upload."
  }
}
