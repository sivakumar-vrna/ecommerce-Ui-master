import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@capacitor-community/http';
import { isPlatform } from '@ionic/angular';
import { from, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from './user.service';

import { Storage } from '@capacitor/storage';
import { TOKEN_KEY } from './auth/auth.service';
// import { LocationService } from 'src/app/components/location/location.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  post: any;
  constructor(
    private http: HttpClient,
    private userService:UserService,
    // private locationService: LocationService,
    private errorService: ErrorService
  ) { }

  // GET - HTTP call for capacitor and Web
  async getCall(url: string, capacitorUrl: string) {
    if (isPlatform('capacitor')) {
      const options = {
        url: capacitorUrl,
        headers: await this.header(),
      };
      return from(Http.get(options)).pipe(
        tap((res) => {
          console.log(res);
          const token = res?.headers['vrna-token'];
          if (token !== undefined && token !== null) {
            this.setToken(token);
          }
        }),
        map((result) => result.data)
      );
    } else {
      return this.http
        .get<any>(url, {
          observe: 'response',
          headers: await this.header()
        })
        .pipe(
          catchError((err: any) => {
            console.log('error caught in service')
            console.error(err);
            this.errorService.onErrorMsg(err?.error?.statusCode)
            return throwError(err);    //Rethrow it back to component
          }),
          tap((res: any) => {
            console.log(res);
            const token = res.headers['vrna-token'];
            if (token !== undefined && token !== null) {
              this.setToken(token);
            }
          }),
          map((res: any) => res.body)
        );
    }
  }

  // POST - HTTP call for capacitor and Web
  async postCall(url: string, capacitorUrl: string, postData: any) {
    if (isPlatform('capacitor')) {
      const options = {
        url: capacitorUrl,
        headers: await this.header(),
        data: postData,
      };
      return from(Http.post(options)).pipe(
        tap((res) => {
          const token = res?.headers['vrna-token'];
          if (token !== undefined && token !== null) {
            this.setToken(token);
          }
        }),
        map((result) => result.data)
      );
    } else {
      return this.http
        .post<any>(url, postData, {
          observe: 'response',
          headers: await this.header()
        })
        .pipe(
          tap((res) => {
            const token = res.headers['vrna-token'];
            if (token !== undefined && token !== null) {
              this.setToken(token);
            }
          }),
          map((res) => res.body)
        );
    }
  }

  // Delete - HTTP call for capacitor and Web
  async deleteCall(url: string, capacitorUrl: string) {
    if (isPlatform('capacitor')) {
      const options = {
        url: capacitorUrl,
        headers: await this.header(),
      };
      return from(Http.del(options)).pipe(
        tap((res) => {
          const token = res?.headers['vrna-token'];
          if (token !== undefined && token !== null) {
            this.setToken(token);
          }
        }),
        map((result) => result.data)
      );
    } else {
      return this.http
        .delete<any>(url, {
          observe: 'response',
          headers: await this.header()
        })
        .pipe(
          tap((res) => {
            const token = res.headers['vrna-token'];
            if (token !== undefined && token !== null) {
              this.setToken(token);
            }
          }),
          map((res) => res.body)
        );
    }
  }

  async header() {
    //const userName = await this.userService.getEmail();
    //const macAddress = await this.userService.getUniqueId();
    //const authorization = await this.userService.getCurrentToken();
    //let country = await this.userService.getCountryCode();

    // if (country === null || country === undefined) {
    //   await this.locationService.getLocationPopover().then(async () => {
    //     country = await this.userService.getCountryCode();
    //   })
    // }

    const headers = {
      'Content-Type': 'application/json',
      // userName: userName,
      // macAddress: macAddress,
      // Authorization: authorization,
      // country: country,
       'userName':'satheshjkv@gmail.com',
       'macAddress':'123456789',
       'authToken':'YTUzYzM1NTQtZGFkYi00ZjI3LWJlN2YtZTFjZmVjZDRiY2M3',
       'country':'IN',
    };
    return headers;
  }

  async setToken(token: string) {
    await Storage.set({ key: TOKEN_KEY, value: token });
  }
}
