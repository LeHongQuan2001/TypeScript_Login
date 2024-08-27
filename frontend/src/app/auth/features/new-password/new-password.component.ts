import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})

export class NewPasswordComponent {
  constructor(private http: ApiService, private router: Router) {}

  onSubmit(data: any) {
    const email = localStorage.getItem('email')
    const body = {
      email: email,
      password: data.password
    }
    this.http.newPassword(body).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.router.navigate(['/auth/login'])
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

}
