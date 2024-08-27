import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/main/interfaces/user/user';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent {
  
  constructor(private http: ApiService) {}

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();
  image: File | null = null;

  closeDialog(): void {
    this.close.emit();
  }

  // submit 
  onSubmit(form: any): void {
    const formData = new FormData();
    formData.append('fullname', form.fullname);
    formData.append('username', form.username);
    formData.append('role_id', form.role_id);
    formData.append('email', form.email);
    formData.append('status', form.status);
    formData.append('address', form.address);
    formData.append('password', "password");
    formData.append('phone', form.phone);

    if (this.image) {
      formData.append('avatar', this.image);
    }

    this.http.createItem("users", formData).subscribe({
      next: (data: any) => {
        // window.location.reload();
      },
      error: (error: Error) => {
        // console.error(error);
        // alert(`Error fetching items: ${error.message}`)
      }
    })

  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
    }
  }

}
