import { RequestModel } from './request.model';

export interface UserSignUpRequestModel extends RequestModel {
  fname?: string;
  lname?: string;
  phone?: string;
  email?: string;
  password?: string;
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
