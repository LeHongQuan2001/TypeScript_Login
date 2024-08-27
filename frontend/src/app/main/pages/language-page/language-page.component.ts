import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectAllService } from '../../features/select-all/services/select-all.service';
import { language } from '../../interfaces/language/language';
import { ApiService } from '../../shared/httpApi/api.service';
import { LanguagePageService } from './services/language-page.service';
import { Router } from '@angular/router';
import { ToastsComponent } from '../../features/toasts/toasts.component';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss'],
})
export class LanguagePageComponent implements OnInit {

  constructor(private selectAllService: SelectAllService, private http: ApiService, private languageService: LanguagePageService, private router: Router) {
  }

  // check dialog
  isShow:boolean = false;
  isDelete: boolean = false;
  isDeleteFailed: boolean = false;
  isDeleteSuccess: boolean = false;
  isShowEdit: boolean = false;
  search: string = "";
  
  // pagination
  currentPage: number = 1;
  limit: number = 10;
  pages: number = 0;

  item: any = {}
  items: language[] = []
  url: string = "/languages"

  // handle delete items
  checkBoxs = new Set<number>();
  checkBoxsTmp = new Set<number>();
  idDelete = new Set<number>();
  
   ngOnInit(): void {
    // this.url = this.getBasePath(this.url)
    this.loadItems()
  }
 
  loadItems() {
    // const accessToken = localStorage.getItem('access_token')
    // if (!accessToken) {
    //   this.router.navigate(['/auth/login'])
    // }
    this.http.getItems("/languages", this.search, this.currentPage, this.limit).subscribe({
      next: (data: any) => {
        data = data["data"]
        this.items = data["result"].slice()
        this.initLanguages(this.items)
        this.pages = data["pages"]
      },
      error: (error) => {
        // console.log(error)
      }
    })
  }

  private getBasePath(url: string): string {
    return url.includes('?') ? url.split('?')[0] : url;
  }
  
  // from SelectAllService
  handleCheckBoxAll(event: any): void {
    this.selectAllService.selectAll(event)
    // add all items
    this.items.forEach(item => {
      // fix
      this.checkBoxsTmp.add(item.id)
    })
  }

  // handle each checkbox
  handleCheckBox(event: any, item: any): void {
    if (event.target.checked) {
      this.checkBoxsTmp.add(item.id)
    } else {
      this.checkBoxsTmp.delete(item.id)
    }
  }

  handleItemsPerPage(event: Event): void {
    const option = event.target as HTMLSelectElement
    this.limit = parseInt(option.value)
    this.loadItems()
  }

  // Add new user
  toggleShow(): void {
    this.isShow = !this.isShow
    this.loadItems()
  }

  toggleDelete(): void {
    this.isDelete = !this.isDelete
  }
  
  toggleDeleteSuccess(): void {
    this.isDeleteSuccess = !this.isDeleteSuccess
    this.loadItems()
  }

  toggleDeleteFailed(): void {
    this.isDeleteFailed = !this.isDeleteFailed
    this.loadItems()
  }

  toggleEdit(): void {
    this.isShowEdit = !this.isShowEdit
    this.loadItems()
  }

  // init language
  initLanguage(item: any): void {
    this.languageService.setItem(item)
    this.item = this.languageService.getItem()
  }

  initLanguages(items: any): void {
    // console.log(items)
    // this.languageService.setItems(items)
    // console.log(this.languageService.getItems())
  }

  // handle delete all
  onClickDeleteAll(): void {
    this.idDelete = this.checkBoxsTmp
    if (this.idDelete.size === 0) {
      this.toggleDeleteFailed();
    } else {
      this.toggleDelete();
    }
  }

  // to delete a particularly item
  onClickDelete(item: any): void {
    this.idDelete.add(item.id)
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadItems();
  }

  onSubmitSearch(search: string): void {
    this.search = search
    this.loadItems()
  }

}
