import { Component, inject, OnInit } from '@angular/core';
import { ToastsService } from '../../features/toasts/toasts.service';
import { BaseService } from 'src/app/core/services/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {

  toastService = inject(ToastsService)
  baseService = inject(BaseService)

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.baseService.setActive('/home')
    // this.baseService.setSubActiveNav('/list')
    this.loadToast()
  }

  loadToast() {
    const template = localStorage.getItem('template')
    const classname = localStorage.getItem('classname')
    const delay = localStorage.getItem('delay')
    if (template && classname && delay) {
      this.toastService.show({template, classname, delay: Number(delay)});
      localStorage.removeItem('template')
      localStorage.removeItem('classname')
      localStorage.removeItem('delay')
    }
  }

}
