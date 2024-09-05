import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../pages/login/password.validator'; // Adjust the import path as needed
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailDomainValidator } from './email-domain.validator';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  postForm: FormGroup;
  passwordVisible = false;
  loginError: boolean = false;

  private readonly secretKey = 'your-secret-key'; // Use a secure key

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.postForm = this.fb.group({
      email: ['', [Validators.required, emailDomainValidator(['gmail.com', 'edu.vn'])]],
      password: ['', [Validators.required, Validators.minLength(5), passwordValidator]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    const rememberedData = localStorage.getItem('rememberMe');
    if (rememberedData) {
      const { email, password } = JSON.parse(rememberedData);
      this.postForm = this.fb.group({
        email: [this.decrypt(email) || '', [Validators.required, emailDomainValidator(['gmail.com', 'edu.vn'])]],
        password: [this.decrypt(password) || '', [Validators.required, Validators.minLength(5), passwordValidator]],
        rememberMe: [true]
      });
    }
  }

  getPasswordError(): string | null {
    const control = this.postForm.get('password');

    if (control && control.dirty && control.touched) {
      const errorMessages = {
        required: 'Password is required',
        minlength: 'Password must be at least 5 characters',
        missingUppercase: 'Password must contain an uppercase letter',
        missingNumber: 'Password must contain a number',
        missingSpecialChar: 'Password must contain a special character',
      } as const;
      const errorKeys = Object.keys(errorMessages) as Array<keyof typeof errorMessages>;

      for (const key of errorKeys) {
        if (control.hasError(key)) {
          return errorMessages[key];
        }
      }
    }
    return null;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.loginError = false;
    if (this.postForm.valid) {
      const { email, password, rememberMe } = this.postForm.value;
      this.authService.login(email, password).subscribe({
        next: (data: any) => {
          if (rememberMe) {
            const encryptedEmail = this.encrypt(email);
            const encryptedPassword = this.encrypt(password);
            localStorage.setItem('rememberMe', JSON.stringify({ email: encryptedEmail, password: encryptedPassword }));
          } else {
            localStorage.removeItem('rememberMe');
          }
          this.router.navigate(['/users/list']);
        },
        error: (error) => {
          console.error(error);
          this.loginError = true;
          this.snackBar.open(
            'Login failed. Please check your credentials.',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            }
          );
        },
      });
    }
  }

  private encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  private decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
