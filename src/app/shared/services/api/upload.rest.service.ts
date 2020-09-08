import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UploadRestService {
    private readonly BASE_URL = environment.apiUrl + 'uploadImage';

    constructor(
        private httpClient: HttpClient
    ) {
    }

    /**
     * @param fileData image data
     * @param category 1: Dish, 2: Profile
     */
    uploadImage(fileData: any, category: string) {
        const formData = new FormData();
        formData.append('file', fileData);
        formData.append('category', category);
        return this.httpClient.post<any>(this.BASE_URL, formData);
    }
}