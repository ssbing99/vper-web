import {RequestModel} from './request.model';

export interface BookingRequestModel extends RequestModel{
  total_days?: number;
  total_person?: number[];
  chef_id?: string;
  user_id?: string;
  book_datetime?: number;
  booking_type?: number;
  address?: AddressModel;
  dish_id?: string[];
  foodbox_menu_company?: string;
  foodbox_menu?: string;
  alergies?: string;
  other?: string;
  couponCode?: string;
  couponData?: any;
}

export interface AddressModel {
  state?: number;
  address?: string;
  city?: number;
  phone?: string;
  postal_code?: string;
  email?: string;
  country?: number;
}

export interface StateRequestModel extends RequestModel {
  Countryid?: number;
}

export interface StateModel {
  country_id?: string;
  id?: string;
  name?: string;
}

export interface CityRequestModel extends RequestModel {
  Stateid?: string;
}

export interface CityModel {
  state_id?: string;
  id?: string;
  name?: string;
}

export interface ValidateCouponRequestModel extends RequestModel {
  coupon_id?: string;
  amount?: string;
}

export interface CouponModel {
  amount?: string;
  percentage?: number;
  amount_off?: number;
  totalammount?: number;
  valid?: string;
}

export interface CouponResponseModel {
  status?: number;
  message?: string;
  data?: CouponModel;
  type?: string;
}

export interface CardInfoModel {
  card_brand?: string;
  card_id?: string;
  card_last4_degit?: string;
  created_date?: string;
  customer_id?: string;
  exp_month?: string;
  exp_year?: string;
  id?: string;
  user_id?: string;
}

export interface BookingModel {
  cardInfo?: CardInfoModel;
  data?: string;
  message?: string;
  status?: number;
}

export interface PaymentRequestModel extends RequestModel{
  order_id?: string;
  savedCard?: boolean;
  payment_method_id?: string;
  user_id?: string;
}

export interface PaymentActionCallbacktModel extends RequestModel{
  order_id?: string;
  savedCard?: boolean;
  payment_intent_id?: string;
  user_id?: string;
}

export interface ExistCardPaymentRequestModel extends RequestModel {
  order_id?: string;
  existCard?: boolean;
  payment_method_id?: string;
  user_id?: string;
}

export interface GetCurrentBookingRequestModel extends RequestModel {
  user_id?: string;
  datetime?: any;
}

export interface BookingDetailsModel {
  book_date: string;
  book_time: string;
  chef_id: string;
  discount_ammount: string;
  fname: string;
  id: string;
  isReviewed: boolean;
  lname: string;
  register_type: string;
  total_price: string;
  user_image: string;
  bookingDate?: any;
  bookingFee?: any;
  user_id?: string;
}

export interface GetCurrentChefBookingRequestModel extends RequestModel {
  chef_id?: string;
  datetime?: any;
}
