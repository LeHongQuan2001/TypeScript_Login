import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, TemplateRef } from '@angular/core';
import { ToastsService } from 'src/app/main/features/toasts/toasts.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent {

  constructor(private http: ApiService, private el: ElementRef) {}

  toastService = inject(ToastsService)

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();
  selectedFile: File | null = null;

  errors: any[] = []

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(form: any) {
    
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('locale', form.locale);

    if (this.selectedFile) {
      formData.append('flag', this.selectedFile);
    }

    this.http.createItem("languages", formData).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.toastService.show({template: data["message"], classname: "toast--success", delay: 4000});
          this.close.emit();
        }, 300);
      },
      error: (error: any) => {
        this.errors = error["error"]["data"]["errors"];
        this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 5000}));
        this.closeDialog()
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
