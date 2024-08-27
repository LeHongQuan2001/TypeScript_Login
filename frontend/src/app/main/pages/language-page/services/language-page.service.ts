import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagePageService {
  item: any = {}
  items: any[] = []
  constructor() { }

  setItem(item: any) {
    this.item = item
    this.item.nameApi = "languages"
  }

  // setItems(items: any) {
  //   this.items = items
  // }

  getItem():void {
    return this.item
  }

  // getItems(): any {
  //   return this.items
  // }

}
