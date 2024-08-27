import { Component, EventEmitter, inject, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastsService } from './toasts.service';
@Component({
  standalone: true,
  selector: 'app-toasts',
  imports: [CommonModule, NgTemplateOutlet, FormsModule],
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})

export class ToastsComponent {

  toastService = inject(ToastsService);

}
