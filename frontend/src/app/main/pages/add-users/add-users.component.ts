import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/httpApi/api.service';
import { Router } from '@angular/router';
import { ToastsService } from '../../features/toasts/toasts.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})

export class AddUsersComponent {

  constructor(private http: ApiService, private router: Router) {}

  toastService = inject(ToastsService)

  image: File | null = null;
  imageSize: number | null = null;
  uploadProgress: number = 0;

  errors: any[] = []

  ngOnInit(): void {}

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
        this.setToast(data["message"], "toast--success", 3000)
        this.router.navigate(['/users/list']);
      },
      error: (error: any) => {
        this.errors = error["error"]["data"]["errors"];
        this.errors.forEach((error, index) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 2000 + (index * 500)}));
      }
    })
  }

  triggerFileInputClick(): void {
    const upload = document.getElementById('upload') as HTMLInputElement;
    if (upload) {
      upload.click();
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
      this.imageSize = this.image.size / 1000;
    }
  }

  setToast(message: string, classname: string, delay: any) {
    localStorage.setItem('template', message)
    localStorage.setItem('classname', classname)
    localStorage.setItem('delay', delay)
  }


}
