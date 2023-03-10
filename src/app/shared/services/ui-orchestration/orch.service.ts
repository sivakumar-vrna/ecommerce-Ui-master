import { Injectable } from '@angular/core';
import { isPlatform } from '@ionic/core';
import { Storage } from '@capacitor/storage';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToastWidget } from '../../widgets/toast.widget';
import { environment } from 'src/environments/environment';
import { OrchestrationService } from '../orchestration/orchestration.service';
// import { UtilityService } from 'src/app/shared/services/utility.service';
// import { VrnaflowService } from 'src/app/shared/services/vrnaflow.service';
export const COUNTRIES_KEY = 'countries';
export const ROLES_KEY = 'roles';
export const COUNTRY_KEY = 'country';
export const GENRES_KEY = 'genres';
export const CURRENCY_KEY = 'currency';

@Injectable({
    providedIn: 'root'
})

export class OrchService {
    getCartItems() {
      throw new Error('Method not implemented.');
    }

    constructor(
        private http: HttpService,
        private toast: ToastWidget,
        private OrchestrationService:OrchestrationService
        // private utilityService: UtilityService,
        // private vrnaflowService: VrnaflowService,
    ) { }

    orchestrateData(data: any) {
        let tempData: any[] = [];
        if (data !== null && data[0]) {
            const tempMoviesList = data;
            tempMoviesList.map(async (book: any) => {
                await this.bookOrchestrate(book);
            });
            tempData = tempMoviesList;
            return tempData;
        } else {
            return null;
        }
    }

    async bookOrchestrate(book: any) {
        const genreName: any[] = [];
        const tempGenres = await Storage.get({ key: GENRES_KEY });
        const genresDataSrc = JSON.parse(tempGenres.value);
        book['bookbannerurl'] = this.domainUrl + '/images' + book.bookbannerurl;
        book['posterurl'] = this.domainUrl + '/images' + book.posterurl;
        genresDataSrc?.map((genre: any) => {
            book?.genre?.find((x: any) => x === genre.genreId) ? genreName.push(genre.genreDesc) : '';
        });
        book['genre'] = genreName;
        if (book.continuewatching) {
            book['percentWatched'] = Number((book.percentWatched / 100).toFixed(1));
        }
    }

    async getGenre() {
        const baseUrl = environment.commonUrl;
        const url = baseUrl + 'common/genres';
        const capacitorUrl = environment.capaciorUrl + url;
        (await this.http.getCall(url, capacitorUrl)).subscribe((res: any) => {
            if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
                const genres = res.data;
                Storage.set({ key: GENRES_KEY, value: JSON.stringify(genres) });
            } else {
                this.toast.onFail('Error in getting genres');
            }
        }, (err: any) => {
            this.toast.onFail('Network Error');
        });
    }

    async getAllConfiguration() {
        (await this.OrchestrationService.getLatest()).subscribe((res: any) => {
            console.log(res);
            if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
                Storage.set({ key: COUNTRIES_KEY, value: JSON.stringify(res?.data?.country) });
                Storage.set({ key: ROLES_KEY, value: JSON.stringify(res?.data?.roles) });
                Storage.set({ key: GENRES_KEY, value: JSON.stringify(res?.data?.genre) });
            } else {
                this.toast.onFail('Error in getting master data');
            }
        }, (err: any) => {
            this.toast.onFail('Network Error');
        })
    }

    get domainUrl() {
        if (isPlatform('capacitor')) {
            return environment.capaciorUrl;
        } else {
            return window.location.origin;
        }
    }
}