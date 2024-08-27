import { Injectable } from '@angular/core';
import { UserPageService } from 'src/app/main/pages/user-page/services/user-page.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private userPageService: UserPageService) { }

  getItem(): void {
    this.userPageService.getaItem()
  }

}
