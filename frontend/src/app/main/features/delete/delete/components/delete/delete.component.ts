import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent {

  constructor(private http: ApiService) {}
  
  @Input() checkBoxs: Set<any> = new Set<number>();
  @Input() idDelete: Set<any> = new Set<number>();
  
  @Input() isDelete: boolean = false;
  @Input() url: string = "";
  @Output() close = new EventEmitter<void>();
  @Output() isDeleteSuccess = new EventEmitter<void>();
  @Output() isDeleteFailed = new EventEmitter<void>();

  dialogFailed() {
    this.close.emit();
    this.isDeleteFailed.emit();
  }

  dialogSuccess() {
    this.close.emit();
    this.isDeleteSuccess.emit();
  }

  onDelete(): void {
      if (this.checkBoxs.size > 0) {
        const arrayCheckBoxs = {
          ids: Array.from(this.checkBoxs)
        }
        
        this.http.deleteItem(this.url, arrayCheckBoxs).subscribe({
          next: (data: any) => {
            this.dialogSuccess()
          },
          error: (error: any) => {
            this.dialogFailed()
          }
        })
      }
  
      // todo: to delete particularly id
      if (this.idDelete.size > 0) {
        const arrayId = {
          ids: Array.from(this.idDelete)
        }
        this.http.deleteItem(this.url, arrayId).subscribe({
          next: (data: any) => {
            this.dialogSuccess()
          },
          error: (error: any) => {
            this.dialogFailed()
          }
        })
      }
  }
}
