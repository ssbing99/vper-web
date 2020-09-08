import { RequestModel } from './request.model';

export interface UserSignUpRequestModel extends RequestModel {
  fname?: string;
  lname?: string;
  phone?: string;
  email?: string;
  password?: string;
}

export interface UserAccountRequestModel {
  id?: string;
  userId?: string;
  user_type?: string;
  email?: string;
  member_upgrade?: string;
  fname?: string;
  lname?: string;
  phone?: string;
  latitude?: string;
  longitude?: string;
  status?: string;
  account_active_by_user?: string;
  push_notification_settings?: string;
  user_referal_code?: string;
  register_type?: string;
  user_id?: string;
  about_me?: string;
  date_created?: string;
  address?: string;
  city?: string;
  country?: string;
  stripe_id?: any;
  method?: string;
  user_image?: string;
}


export interface ChefSignUpRequestModel extends RequestModel {
  fname?: string;
  lname?: string;
  phone?: string;
  address?: string;
  email?: string;
  password?: string;
  latitude?: number;
  longitude?: number;
  refral_code?: string;
}
