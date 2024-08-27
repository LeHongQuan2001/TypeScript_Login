import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { ToastsService } from 'src/app/main/features/toasts/toasts.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  constructor(private http: ApiService, private el: ElementRef) {}

  toastService = inject(ToastsService)

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();

  errors: any[] = [];

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(data: any): void {
    this.http.createItem('categories', data).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.toastService.show({template: data["message"], classname: "toast--success", delay: 4000});
          this.close.emit();
        }, 300);
      },
      error: (error: any) => {
        this.errors = error["error"]["data"]["errors"];
        this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 4000}));
        // this.closeDialog()
       },
    });       
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const dialog = event?.target as HTMLElement
    if(!dialog.closest('.modal-dialog')) {
      this.closeDialog()
    }
  }

}
