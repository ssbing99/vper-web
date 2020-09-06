import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {
    ChefAmountRequest,
    GetChefByKeywordsRequest,
    GetChefDetailsRequest,
    GetChefRequest
} from '../../models/chef.model';
import {
    BookingRequestModel,
    CityRequestModel,
    ExistCardPaymentRequestModel,
    GetCurrentBookingRequestModel,
    GetCurrentChefBookingRequestModel,
    PaymentActionCallbacktModel,
    PaymentRequestModel,
    StateRequestModel,
    ValidateCouponRequestModel
} from '../../models/booking.model';

@Injectable({
    providedIn: 'root'
})
export class DishRestService {
    private readonly BASE_URL = environment.apiUrl + 'dish';

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getChefs(params: GetChefRequest) {
        params.method = 'getCheflocationWithDetails';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getChefsByKeywords(params: GetChefByKeywordsRequest) {
        params.method = 'getChefsByKeywords';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getChefDetailsById(params: GetChefDetailsRequest) {
        params.method = 'getChefProfiledata';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getTotalChefAmount(params: ChefAmountRequest) {
        params.method = 'GetPersonDayviseAmnt';
        return this.httpClient.post(this.BASE_URL, params);
    }

    bookChefNow(params: BookingRequestModel) {
        params.method = 'handelBookrequest';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getState(params: StateRequestModel) {
        params.method = 'GetStateby_Cid';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getCity(params: CityRequestModel) {
        params.method = 'GetCityby_Sid';
        return this.httpClient.post(this.BASE_URL, params);
    }

    validateCoupon(params: ValidateCouponRequestModel) {
        params.method = 'StripeCouponOff';
        return this.httpClient.post(this.BASE_URL, params);
    }

    paymentHandler(params: PaymentRequestModel) {
        params.method = 'StripePaymentHandler';
        return this.httpClient.post(this.BASE_URL, params);
    }

    paymentActionCallbackHandler(params: PaymentActionCallbacktModel) {
        params.method = 'StripePaymentHandler';
        return this.httpClient.post(this.BASE_URL, params);
    }

    existCardPaymentHandler(params: ExistCardPaymentRequestModel) {
        params.method = 'StripePaymentHandler';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getCurrentUserBooking(params: GetCurrentBookingRequestModel) {
        params.method = 'GetCurrentbooking';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getPastUserBooking(params: GetCurrentBookingRequestModel) {
        params.method = 'GetPastbooking';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getCurrentChefBooking(params: GetCurrentChefBookingRequestModel) {
        params.method = 'GetChefCurrentbooking';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getPastChefBooking(params: GetCurrentChefBookingRequestModel) {
        params.method = 'GetChefPastbooking';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getChefReferralData(params: any) {
        params.method = 'GetChefReferalData';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getTotalIncomeData(params: any) {
        params.method = 'GetChefAllbooking';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getChefReview(params: any) {
        params.method = 'getChefReview';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getChefDishdata(params: any) {
        params.method = 'getChefDishdata';
        return this.httpClient.post(this.BASE_URL, params);
    }

    deleteDish(params: any) {
        params.method = 'deleteChefDishdata';
        return this.httpClient.post(this.BASE_URL, params);
    }

    saveDish(params: any) {
        params.method = 'addChefDish';
        return this.httpClient.post(this.BASE_URL, params);
    }

    updateDish(params: any) {
        params.method = 'updateChefDishdata';
        return this.httpClient.post(this.BASE_URL, params);
    }

    getChefChatList(params: any) {
        params.method = 'getchefchatList';
        return this.httpClient.post(this.BASE_URL, params);
    }
}
