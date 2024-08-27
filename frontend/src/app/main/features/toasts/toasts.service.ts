import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  template: string | TemplateRef<any>,
  classname?: string,
  delay?: number
}

@Injectable({
  providedIn: 'root'
})

export class ToastsService {

  constructor() {
  }

  toasts: Toast[] = [];

  show(toast: Toast) {
    this.toasts.push(toast);
    if (toast.delay) {
      setTimeout(() => {
        this.remove(toast);
      }, toast.delay);
    }
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

}
