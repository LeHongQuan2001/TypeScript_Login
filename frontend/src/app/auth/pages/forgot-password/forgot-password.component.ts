import { Component, inject, Input } from '@angular/core';
import { ToastsService } from 'src/app/main/features/toasts/toasts.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  toastService = inject(ToastsService)
  
  verifyCode: string = ""
  isVerify: boolean = false
  isSendEmail: boolean = false
  isFormNewPassword: boolean = false
  errors: any[] = []

  constructor(private http: ApiService) {
    this.isVerify = false
  }

  onSubmit(data: any): void {
    this.http.exists(data).subscribe({
      next: (data: any) => {
        this.isVerify = true
        this.isSendEmail = true
        this.sendEmail()
      },
      error: (error: any) => {
        this.errors = error["error"]["data"]["errors"];
        this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 4000}));
      }
    })
  }

  sendEmail() {
    this.getRandomNumber()
    const email = localStorage.getItem('email')
    const body = {
      to: email,
      subject: "Reset Password",
      text: this.verifyCode
    }
    this.http.sendEmail(body).subscribe({
      next: (data: any) => {

      },
      error: (error: any) => {
        
      }
    })
  }

  getRandomNumber() {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.verifyCode = random.toString();
  }

  toggleShow() {
    this.isSendEmail = !this.isSendEmail
    this.isFormNewPassword = !this.isFormNewPassword
  }

}
