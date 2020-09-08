import {RequestModel, ResponseModel} from './request.model';

export interface LoginRequestModel extends RequestModel {
  email?: string;
  password?: string;
  device_id?: string;
}

export interface LoginResponseModel {
  account_active_by_user?: string;
  date_created?: string;
  email?: string;
  fname?: string;
  id?: string;
  latitude?: string;
  lname?: string;
  longitude?: string;
  member_upgrade?: string;
  phone?: string;
  push_notification_settings?: string;
  status?: string;
  user_image?: string;
  user_referal_code?: string;
  user_type?: string;
  country?: string;
  city?: string;
  address?: string;
  about_me?: string;

}

export interface LoginFacebookModel extends RequestModel {
  id?: string;
  name?: string;
  image?: string;
  email?: string;
  device_id?: string;
  device_platform?: string;
}

export interface LoginGoogleModel extends RequestModel {
  email?: string;
  userId?: string;
  device_id?: string;
  device_platform?: string;
  givenName?: string;
  familyName?: string;
  imageUrl?: string;
}
