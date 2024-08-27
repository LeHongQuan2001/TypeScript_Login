import { Component } from '@angular/core';
import { ShowPasswordService } from '../../features/show-password/show-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  isCheckPW: boolean = false
  inputType: string = 'password'

  constructor(public showPW: ShowPasswordService) {}

  togglePW(): void {
    this.showPW.showPassWord();
    this.isCheckPW = this.showPW.isShowPassWord;
    this.inputType = this.showPW.inputType
  }
}
