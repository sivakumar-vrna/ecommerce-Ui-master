import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { nanoid } from 'nanoid'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastWidget } from '../../widgets/toast.widget';
import { Auth } from '../../models/auth';

export const TOKEN_KEY = 'token';
export const USER_KEY = 'userId';
export const USERNAME_KEY = 'username';
export const STRIPE_KEY = 'rentId';
export const MAC_KEY = 'macId';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(
    private http: HttpClient,
    public navCtrl: NavController,
    private toast: ToastWidget,
    private router: Router,
  ) {
    this.loadToken();
  }

   


  async loadToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  /* Registration Complete */
  async onUserConfirm(token: string) {
    const url = environment.authUrl + 'user/confirm?token=' + token;
    return this.getCall(url);
  }

  /* Validating User */
  async onAuthentication(user: Auth, macAddress: any) {
    const url = environment.vrnaFlowUrl + 'login';
    return this.postRequest(url, user, macAddress);
  }

  onSignup(data: any, macAddress: any) {
    const url = environment.vrnaFlowUrl + 'signup';
    return this.postRequest(url, data, macAddress);
  }

  onRequestResetPwd(data: any, macAddress: any) {
    const url = environment.vrnaFlowUrl + 'forgotpassword';
    return this.postRequest(url, data, macAddress);
  }

  onResetPwd(data: any, macAddress: any) {
    const url = environment.authUrl + 'user/updpass';
    return this.postRequest(url, data, macAddress);
  }

  /* Unique ID Creation */
  uniqueID() {
    const uniqueId = nanoid();
    return uniqueId;
  }

  getHeaders(email) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      userName: email,
    });
  }

  // GET - HTTP call for capacitor and Web
  async getCall(url: string) {
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.http
      .get<any>(url, {
        observe: 'response',
        headers: headers
      })
      .pipe(
        map((res) => res.body)
      );
  }

  postRequest(url, postData: Auth, macAddress: any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      userName: postData.email,
      macAddress: macAddress,
    };
    let token = null;
    return this.http.post<any>(url, postData, {
      observe: 'response',
      headers: headers
    }).pipe(
      tap(res => {
        token = res.headers.get('vrna-token');
      }),
      map(res => {
        res.body['token'] = token;
        return res.body;
      })
    )
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      this.log(`${error.error.statusCode} : ${error.error.message}`);
      return of(result as T);
    }
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.toast.onFail(message);
  }

  // #After Successfull login
  async afterLogin(userData: any, macId: any, token: string) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData.userId));
    localStorage.setItem(USERNAME_KEY, userData.email);
    localStorage.setItem(STRIPE_KEY, userData.stripeId);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(MAC_KEY, macId);
    this.isAuthenticated.next(true);
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  logout() {
    this.isAuthenticated.next(false);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(MAC_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

}
