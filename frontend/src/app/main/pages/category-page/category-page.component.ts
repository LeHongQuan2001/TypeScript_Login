import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectAllService } from '../../features/select-all/services/select-all.service';
import { Category } from '../../interfaces/category/category';
import { ApiService } from '../../shared/httpApi/api.service';
import { CategoryPageService } from './services/category-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  constructor(private selectAllService: SelectAllService, private http: ApiService, private categoryService: CategoryPageService, private router: Router) {}

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

  item: any = {};
  items: Category[] = []
  checkBoxs = new Set<number>();
  checkBoxsTmp = new Set<number>();
  idDelete = new Set<number>();
  url: string = "/categories"

  ngOnInit(): void {
    this.loadItems()
  }

  loadItems() {
    this.http.getItems("/categories", this.search, this.currentPage, this.limit).subscribe({
      next: (data: any) => {
        this.items = data["data"]["result"].slice()
        this.pages = data["pages"]
      },
      error: (error) => {
        // alert(`Error fetching items: ${error.message}`)
      }
    })
  }
  
  // handle all checkbox
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
  
  handleItemsPerPage(event: Event): void {
    const option = event.target as HTMLSelectElement
    this.limit = parseInt(option.value)
    this.loadItems()
  }

  // init item
  initCategory(item: any): void {
    this.categoryService.setItem(item)
    this.item = this.categoryService.getItem()
  }

  // to delete a particularly item
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

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadItems();
  }

  onSubmitSearch(search: string): void {  
    this.search = search
    this.loadItems()
  }
    
}
