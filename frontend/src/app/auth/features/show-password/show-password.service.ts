import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowPasswordService {

  constructor() { }
  
  isShowPassWord: boolean = false;
  inputType: string = 'password'

  showPassWord(): void {
    this.isShowPassWord = !this.isShowPassWord;
    if (this.isShowPassWord) {
      this.inputType = "text"
    } else {
      this.inputType = "password"
    }
  }
  
}
