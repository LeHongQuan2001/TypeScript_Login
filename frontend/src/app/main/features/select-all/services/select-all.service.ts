import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SelectAllService {
  
  selectAll(event: any): void {
    const checked = event.target.checked

    const checkboxes = document.querySelectorAll('.dt-checkboxes.form-check-input:not(#select-all)')

    checkboxes.forEach(check => {
      // ép kiểu này TypeScript mới hiểu được thuộc tính checked
      (check as HTMLInputElement).checked = checked
    })
  }

  unSelectAll(event: any): void {
    const checked = event.target.checked

    const checkboxes = document.querySelectorAll('.dt-checkboxes.form-check-input:not(#select-all)')

    checkboxes.forEach(check => {
      (check as HTMLInputElement).checked = checked
    })
  }
}
