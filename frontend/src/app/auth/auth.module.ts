import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NavComponent } from './layouts/nav/nav.component';
import { SharedModule } from '../main/shared/shared.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './features/verify-email/verify-email.component';
import { NewPasswordComponent } from './features/new-password/new-password.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent,
    NavComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    VerifyEmailComponent,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    NewPasswordComponent,
    TranslateModule.forChild()
  ]
})

export class AuthModule { }
