import { Injectable } from '@angular/core';
import { User } from 'src/app/main/interfaces/user/user';
import { UserPageService } from 'src/app/main/pages/user-page/services/user-page.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteSuccessService {
  
  constructor(private userPageService: UserPageService) { }

  getItem(): void {
    this.userPageService.getaItem()
  }

}
