import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  loginForm: FormGroup
  message = 'LOGIN';
  name: string;
  hide = true;
  tempLogin = true;
  isSubmitted = false;

  constructor(
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    public platform: Platform,
    public toast: ToastWidget,
  ) {
    this.createForm();
    this.initializeApp();
  }

  ngOnInit() {
    GoogleAuth.initialize({
      clientId: '706306776113-i5i82n0gt2os9ijb83aka4sbfmm2b7re.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  }

  async googleSignIn() {
    let googleUser = await GoogleAuth.signIn();
    await GoogleAuth.signIn()
    .then(res => {
      console.log(res);
      console.log(res.imageUrl);
      this.checkExistingUser(res);
    })
    .catch(err => {
      console.log(err);
      if (err.error) {
        this.toast.onFail('Google Sign In popup closed.');
      } else {
        this.toast.onFail('Error in Google Sign In');
      }
    })
  }

  checkExistingUser(googleUser) {
    const user = {
      email: googleUser.email,
      firstName: googleUser.givenName,
      lastName: googleUser.familyName,
      loginVia: 'google'
    };
    const macId = this.authservice.uniqueID();
    this.authservice.onSignup(user, macId).subscribe(
      (res) => {
        console.log(res);
        if (res.status.toLowerCase() === 'success') {
          const userData = res.data;
          this.authservice.afterLogin(userData, macId, res.token);
        } else {
          this.toast.onFail('Error Signing in via social login');
        }
        this.isSubmitted = false;
      },
      (err) => {
        this.isSubmitted = false;
        this.toast.onFail(err);
      });
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      GoogleAuth.initialize()
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  async onSubmit() {
    this.modal.dismiss(this.name, 'confirm');
    this.isSubmitted = false;
    this.tempLogin = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}`;
    }
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  /* Email Error Msg's */
  getEmailErrorMsg() {
    if (this.f['email'].hasError('required')) {
      return 'Email is Required';
    }
    return this.f['email'].hasError('email') ? 'Valid Format is yourname@example.com' : '';
  }
}
