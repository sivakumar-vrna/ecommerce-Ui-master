import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, Platform } from '@ionic/angular';
import { ToastWidget } from '../shared/widgets/toast.widget';
import { AuthService } from './auth.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';




@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
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


  async initializeApp() {
    this.platform.ready().then(() => {
      GoogleAuth.initialize()
    })
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

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}`;
    }
  }

  async onSubmit() {
    this.modal.dismiss(this.name, 'confirm');
    this.isSubmitted = false;
    this.tempLogin = false;
  }



  


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
}
