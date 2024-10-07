import { Component, EventEmitter, HostListener, inject, OnInit, Output } from '@angular/core';
import { ApiService } from '../../shared/httpApi/api.service';
import { Router } from '@angular/router';
import { LanguagePageService } from '../../pages/language-page/services/language-page.service';
import { language } from '../../interfaces/language/language';
// import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../shared/i18n/translation.service';
import { BaseService } from 'src/app/core/services/base.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  constructor(private http: ApiService, private router: Router, private languageService: LanguagePageService, private translate: TranslationService) {}

  item: any = {}
  languages: any[] = []
  icActive: boolean = false
  selectedLanguage: any = {}
  url: string = ''

  // pagination
  currentPage: number = 1;
  limit: number = 10;
  pages: number = 0;
  search: string = "";

  ngOnInit(): void {
    this.loadData()
    this.selectedLanguage.locale = localStorage.getItem('locale')
    this.translate.setDefaultLang(this.selectedLanguage.locale)
  }

  loadData() {
    const id = localStorage.getItem('user_id');

    this.http.getUser(id).subscribe({
      next: (data: any) => {
        this.item = data["data"]
        this.loadLanguage()
      },
      error: (err: any) => {
      }
    })
    
  }

  loadLanguage() {
    this.http.getItems('/sites/getLanguages', this.search, this.currentPage, this.limit, '', '').subscribe({
      next: (data: any) => {
        this.languages = data["data"]["languages"]
        this.languages.map((language: language) => {
          if (language.locale === localStorage.getItem('locale')) {
            this.selectedLanguage = language
          }
        })
      },
      error: (err: any) => {
      }
    })
  }

  toggleIcon() {
    const htmlElement = document.documentElement; // Truy cập phần tử <html>
    if (htmlElement.classList.contains('layout-menu-fixed')) {
      htmlElement.classList.add('layout-menu-expanded');
    } else {
      htmlElement.classList.remove('layout-menu-expanded');
    }
  }

  onLogOut() {
    this.http.logout()
    this.router.navigate(['/auth/login'])
  }

  onClickActive(language: any): void {
    this.selectedLanguage = language
    this.translate.switchLang(this.selectedLanguage.locale);
    localStorage.setItem('locale', this.selectedLanguage.locale)
  }
  
}
