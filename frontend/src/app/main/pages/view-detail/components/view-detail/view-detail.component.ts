import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';
import { ToastsService } from 'src/app/main/features/toasts/toasts.service';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})

export class ViewDetailComponent implements OnInit {

  constructor(private http: ApiService, private route: ActivatedRoute, private router: Router) {}

  toastService = inject(ToastsService)
  
  item: any = {}
  url: string = ""
  errors: any[] = []

  // delete
  isDelete: boolean = false;
  isDeleteSuccess: boolean = false;
  isDeleteFailed: boolean = false;
  idDelete = new Set<number>();

  // update
  @Input() isShowEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  image: File | null = null;
  showImageTmp: string = "";

  ngOnInit(): void {
    this.loadItem()
    this.router.url.split('/').forEach(segment => {
      if (segment === 'users') {
        this.url = '/' + segment
      }
    })
  }

  loadItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.getUser(id).subscribe({
      next: (data: any) => {
        this.item = data["data"]
      },
      error: (error: Error) => {
        alert(`Error fetching items: ${error.message}`)
      }
    })
  }

  toggleDelete(): void {
    this.isDelete = !this.isDelete
  }

  toggleDeleteSuccess(): void {
    this.isDeleteSuccess = !this.isDeleteSuccess
    setTimeout(() => {
      this.router.navigate(["/users/list"])
    }, 10000);
  }

  toggleDeleteFailed(): void {
    this.isDeleteFailed = !this.isDeleteFailed
  }
  
  onClickDelete(item: any): void {
    this.idDelete.add(item.id)
  }

  // update
  onSubmit(form: any): void {
    const formData = new FormData();

    if (this.image) {
      formData.append('avatar', this.image);
    }

    formData.append('fullname', form.fullname);
    formData.append('username', form.username);
    formData.append('role_id', form.role_id);
    formData.append('email', form.email);
    formData.append('status', form.status);
    formData.append('address', form.address);
    formData.append('password', "password");
    formData.append('phone', form.phone);

    this.http.updateItem("users", formData, this.item.id).subscribe({
      next: (data: any) => {
        this.toastService.show({template: "Update successfully", classname: "toast--success", delay: 4000});
        this.loadItem()
      },
      error: (error: any) => {
        this.errors = error["error"]["data"]["errors"];
        this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 5000}));
      }
    })
  }
  
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
      this.showImageTmp = "http://localhost:3000/" + this.image.name
    }
  }

}
