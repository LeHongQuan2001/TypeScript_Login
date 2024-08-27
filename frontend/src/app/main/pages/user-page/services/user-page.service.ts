import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPageService {

  constructor() { }

  item: any = {}

  setaItem(item: string): any {
    this.item = item
    this.item.nameApi = "users"
  }

  getaItem(): void {
    return this.item
  }

}
