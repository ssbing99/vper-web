import {RequestModel} from './request.model';

export interface ChatRequestModal extends RequestModel {
  user_id_from?: string;
  user_id_to?: string;
}

export interface PastChatRequestModel extends RequestModel {
  user_id_to?: string;
  user_id_from?: string;
  order_id?: string;
}

export interface PastChatModel {
  data?: ChatContentModel[];
  fromImage?: string;
  status?: number;
  toImage?: string;
}

export interface ChatContentModel {
  date?: string;
  id?: string;
  message?: string;
  user_id_from?: string;
  user_id_to?: string;
  timestamp?: any;
}

export interface ChatInfoModel {
  chatId?: string;
  fname?: string;
  id?: string;
  lname?: string;
  register_type?: string;
  user_image?: string;
}