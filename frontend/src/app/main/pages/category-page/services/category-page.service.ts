import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryPageService {

  item: any = {}

  constructor() { }

  setItem(item: any) {
    this.item = item
    this.item.nameApi = "categories"
  }

  getItem() {
    return this.item
  }

}
