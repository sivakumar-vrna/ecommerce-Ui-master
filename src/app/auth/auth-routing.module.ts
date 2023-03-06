import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
      path: '',
      component: AuthComponent,
      children: [
          {
              path: '',
              redirectTo: 'login',
              pathMatch: 'full'
          },
          {
              path: 'login',
              component: LoginComponent,
          },
          {
              path: 'signup',
              component: SignupComponent,
          },
          {
              path: 'reset',
              component: ForgotPwdComponent,
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
