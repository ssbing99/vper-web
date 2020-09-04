import {RequestModel} from './request.model';

export interface GetChefRequest extends RequestModel{
  page?: number;
  pageCount?: number;
  latitude?: string;
  longitude?: string;
  callType?: string;
  name?: string;
}

export interface GetChefByKeywordsRequest extends RequestModel {
  keywords?: string;
}

export interface GetChefDetailsRequest extends RequestModel{
  userId?: string;
}

export interface GetChefSearchResult {
  fname?: string;
  lname?: string;
}

export interface ChefModel {
  about_me?: string;
  account_active_by_user?: string;
  address?: string;
  city?: string;
  date_created?: string;
  device_id?: string;
  device_platform?: string;
  distance?: number;
  email?: string;
  fb_id?: string;
  fb_tocken?: string;
  fname?: string;
  forget_token?: string;
  google_id?: string;
  google_tocken?: string;
  id?: string;
  last_login?: string;
  latitude?: string;
  lname?: string;
  login_ip?: string;
  longitude?: string;
  member_upgrade?: string;
  name?: string;
  pass?: string;
  phone?: string;
  push_notification_settings?: string;
  register_referal_code?: string;
  register_type?: string;
  review?: number;
  status?: string;
  stripe_id?: string;
  user_id?: string;
  user_image?: string;
  user_referal_code?: string;
  user_type?: string;
  verification_code?: string;
  dish?: DishModel[];
  feedbacks?: FeedbackModel[];
  isLoaded?: boolean;
}

export interface DishModel {
  grocery?: string;
  id?: string;
  image?: string;
  name?: string;
  isLoaded?: boolean;
}

export interface FeedbackModel {
  chef_id?: string;
  created_date?: string;
  fname?: string;
  id?: string;
  image?: string;
  name?: string;
  order_id?: string;
  ratings?: string;
  register_type?: string;
  review_text?: string;
  status?: string;
  user_id?: string;
  user_image?: string;
}

export interface ChefDetailsModel {
  dish?: DishModel[];
  profile?: ChefProfileModel;
  review?: FeedbackModel[];
}

export interface ChefProfileModel {
  about_me?: string;
  address?: string;
  city?: string;
  country?: string;
  email?: string;
  fname?: string;
  id?: string;
  latitude?: string;
  lname?: string;
  longitude?: string;
  register_type?: string;
  user_image?: string;
}

export interface ChefAmountRequest extends RequestModel {
  totaldays?: number;
  person?: number[];
}

export interface ChefAmountModel {
  message?: string;
  price?: string;
  status?: number;
}

export interface GetChefInfoRequest extends RequestModel {
  chef_id?: string;
}

export interface CommonTips {
  ammount?: number;
  endDate?: string;
  startdate?: string;
}
