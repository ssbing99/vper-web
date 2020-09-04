export interface RequestModel {
  method?: string;
}

export interface ResponseModel<T> {
  data?: T;
  message?: string;
  status: number;
  totalcountpage?: number;
}
