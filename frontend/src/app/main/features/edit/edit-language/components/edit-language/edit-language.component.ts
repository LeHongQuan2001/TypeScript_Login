import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/main/features/toasts/toasts.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.scss']
})
export class EditLanguageComponent {
  constructor(private http: ApiService, private router: Router) { }

  toastService = inject(ToastsService)

  @Input() isShowEdit: boolean = false;
  @Input() item: any = {};
  @Output() close = new EventEmitter<any>()
  selectedFile: File | null = null;

  errors: any[] = [];


  closeDialog(): void {
    this.close.emit()
  }

  onSubmit(form: any): void {
    const id = this.item.id
    
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('locale', form.locale);
    
    if (this.selectedFile) {
      formData.append('flag', this.selectedFile);
    }

    this.http.updateItem("languages", formData, id).subscribe({
      next: (data: any) => {
        this.toastService.show({template: data["message"], classname: "toast--success", delay: 5000});
        this.closeDialog()
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
      this.selectedFile = input.files[0];
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const dialog = event?.target as HTMLElement
    if(!dialog.closest('.modal-dialog')) {
      this.closeDialog()
    }
  }

}
