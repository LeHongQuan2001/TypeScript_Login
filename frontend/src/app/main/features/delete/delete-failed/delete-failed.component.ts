import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-failed',
  templateUrl: './delete-failed.component.html',
  styleUrls: ['./delete-failed.component.scss']
})
export class DeleteFailedComponent {
  @Input() isDeleteFailed: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }
} 
