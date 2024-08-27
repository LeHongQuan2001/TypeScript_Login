import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService) {}

  setDefaultLang(lang: string): void {
    this.translate.setDefaultLang(lang)
  }

  getTranslation(lang: string): Observable<any> {
    return this.translate.getTranslation(lang);
  }

  switchLang(lang: string): void {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

}
