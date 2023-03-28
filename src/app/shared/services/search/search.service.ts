import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http.service';
import { UserService } from '../user.service';

export const RENTED_KEY = 'rented';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpService, private userService: UserService) { }

    async onSearchSuggest(search: string) {
        const baseUrl = environment.contentUrl + 'suggest';
        const userId = await this.userService.getUserId();
        const url = baseUrl + `?searchId=${search}&userId=${userId}`;
        const capacitorUrl = environment.capaciorUrl + url;
        return this.http.getCall(url, capacitorUrl);
    }
    
    async onSearch(search: string) {
        const baseUrl = environment.contentUrl + 'search';
        const userId = await this.userService.getUserId();
        const url = baseUrl + `?searchId=${search}&userId=${userId}`;
        const capacitorUrl = environment.capaciorUrl + url;
        return this.http.getCall(url, capacitorUrl);
    }

}
