import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { ToastsService } from 'src/app/main/features/toasts/toasts.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  constructor(private http: ApiService) { }
  
  toastService = inject(ToastsService)

  @Input() isShowEdit: boolean = false;
  @Input() item: any = {};
  @Output() close = new EventEmitter<void>();

  errors: any[] = []

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(data: any): void {
    const id = this.item.id
    this.http.updateItem('categories', data, id).subscribe({
      next: (data: any) => {
        this.toastService.show({template: data["message"], classname: "toast--success", delay: 4000});
        this.closeDialog()
      },
      error: (error: any) => {
        this.errors = error["error"]["data"]["errors"];
        this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 4000}));
      }
    })
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const dialog = event?.target as HTMLElement
    if(!dialog.closest('.modal-dialog')) {
      this.closeDialog()
    }
  }
  
}
