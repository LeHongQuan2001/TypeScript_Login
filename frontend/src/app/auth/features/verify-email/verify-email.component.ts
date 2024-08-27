import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, map, Observable, takeWhile, timer } from 'rxjs';
import { ToastsComponent } from 'src/app/main/features/toasts/toasts.component';
import { ToastsService } from 'src/app/main/features/toasts/toasts.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';
import { SharedModule } from 'src/app/main/shared/shared.module';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, ToastsComponent],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {

  toastService = inject(ToastsService)
  timeRemaining: any = {};

  email: string = ''
  @Input() verifyCode: string = ""
  otp: any[] = [];
  combinedOtp: string = '';
  errors: any[] = [];

  @Output() close = new EventEmitter();

  constructor(private http: ApiService) {
  }

  ngOnInit(): void {
    this.timeRemaining = timer(0, 1000).pipe(
      map(n => (60 - n) ), // 86400s = 24h
      takeWhile(n => n >= 0),
      finalize(() => {
        this.deleteOtp()
        this.toastService.show({template: "Success", classname: "toast--success", delay: 4000})
      })
    );
  }

  updateOtp(event: any) {
    this.otp.push(event.target.value);
    this.combinedOtp = this.otp.join('');
  }

  onSubmit(form: any) {
    this.http.verifyEmail(form).subscribe({
      next: (data: any) => {
        this.close.emit()
      }, error: (error: any) => {
         this.errors = error["error"]["data"]["errors"];
          this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 4000}));
      }
    })
  }

  onDelete() {
    this.deleteOtp()
  }

  deleteOtp() {
    const body = {
      otp: this.verifyCode
    }
    this.http.deleteOtp(body).subscribe({
      next: (data: any) => {
        this.toastService.show({template: "Success", classname: "toast--success", delay: 4000})
      },
      error: (error: any) => {
        console.log(error)
        this.errors = error["error"]["data"]["errors"];
          this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 4000}));
      }
    });
  }
  
}
