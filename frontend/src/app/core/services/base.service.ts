import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public activeNav$ = new BehaviorSubject<string>('')
  public subActiveNav$ = new BehaviorSubject<string>('list')

  constructor(private router: Router) { }

  // get url
  getUrl() {
    this.activeNav$ = new BehaviorSubject<string>(this.router.url)
  }

  setActive(url: string) {
    this.activeNav$.next(url)
  }

  setSubActiveNav(url: string) {
    this.subActiveNav$.next(url)
  }

}
