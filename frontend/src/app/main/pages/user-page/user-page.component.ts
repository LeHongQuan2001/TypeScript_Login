import { ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserPageService } from './services/user-page.service';
import { SelectAllService } from '../../features/select-all/services/select-all.service';
import { User } from '../../interfaces/user/user';
import { ApiService } from '../../shared/httpApi/api.service';
import { Router } from '@angular/router';
import { ToastsService } from '../../features/toasts/toasts.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit {

  constructor(private selectAllService: SelectAllService, private itemDetail: UserPageService, private api: ApiService, private router: Router) {}

  toastService = inject(ToastsService)

  isShow:boolean = false;
  isDelete: boolean = false;
  isDeleteSuccess: boolean = false;
  isDeleteFailed: boolean = false;
  isShowEdit: boolean = false;
  search: string = "";

  // pagination
  currentPage: number = 1;
  limit: number = 10;
  pages: number = 0;

  item: any = {}
  items: User[] = []
  url: string = "/users"

  // handle deleting
  checkBoxs = new Set<number>();
  checkBoxsTmp = new Set<number>();
  idDelete = new Set<number>();
  checkDeleteAll: boolean = false;
  
  ngOnInit(): void {
    // this.url = this.getBasePath(this.url)
    this.loadItems()
    this.loadToast()
  }

  // load data
  loadItems() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      this.router.navigate(['/auth/login'])
    }
    this.api.getItems("/users", this.search, this.currentPage, this.limit).subscribe({
      next: (data: any) => {
        data = data.data
        this.items = data["result"].slice()
        this.pages = data["pages"]
      }, 
      error: (error) => {
        // alert(`Error fetching items: ${error.message}`)
      }
    });
  }

  private getBasePath(url: string): string {
    return url.includes('?') ? url.split('?')[0] : url;
  }

  // from SelectAllService
  handleCheckBoxAll(event: any): void {
    if (event.target.checked) {
      this.selectAllService.selectAll(event)
    } else {
      this.selectAllService.unSelectAll(event)
    }
    this.selectAllService.selectAll(event)
    // add all items
    this.items.forEach(item => {
      // fix
      this.checkBoxsTmp.add(item.id)
    })
    this.onCheckDeleteAll()
  }

  // handle each checkbox
  handleCheckBox(event: any, item: any): void {
    if (event.target.checked) {
      this.checkBoxsTmp.add(item.id)
    } else {
      this.checkBoxsTmp.delete(item.id)
    }
    this.onCheckDeleteAll()
  }

  // Add new user
  toggleShow(): void {
    this.isShow = !this.isShow
  }

  toggleDelete(): void {
    this.isDelete = !this.isDelete
    this.loadItems()
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
  }

  // xử lí khi thay đổi select, tức là giới hạn mỗi trang
  handleItemsPerPage(event: Event): void {
    const option = event.target as HTMLSelectElement
    this.limit = parseInt(option.value)
    this.loadItems()
  }

  // view detail
  initItem(item: any): void {
    this.itemDetail.setaItem(item)
    this.item = this.itemDetail.getaItem()
  }

  onClickDelete(item: any): void {
    this.idDelete.add(item.id)
  }

  onClickDeleteAll(): void {
    this.idDelete = this.checkBoxsTmp
    if (this.idDelete.size === 0) {
      this.toggleDeleteFailed();
    } else {
      this.toggleDelete();
    }
  }

  // submit search
  onSubmitSearch(search: string): void {
    this.search = search
    this.loadItems()
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadItems();
  }

  onCheckDeleteAll() {
    this.checkDeleteAll = this.checkBoxsTmp.size !== 0 ? true : false
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


