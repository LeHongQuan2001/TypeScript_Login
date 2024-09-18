import { Component, inject } from '@angular/core';
import { ApiService } from '../../shared/httpApi/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsService } from '../../features/toasts/toasts.service';

interface Permission {
  groupPermission: any;
  id: number;
  name: string;
  groupId: number;
  rolePermission: any;
}

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent {
  errors: any[] = [];
  items: Permission[] = [];
  search: string = '';
  inputType: string = 'select';
  GroupPermissions: any[] = [];
  selectedPermission: any = {};

  // pagination
  currentPage: number = 1;
  limit: number = 10;
  pages: number = 0;

  addPermissionForm = this.fb.group({
    permissionName: ['', Validators.required],
    groupPermission: [''],
  });

  editPermissionForm: FormGroup = this.fb.group({
    editPermissionName: ['', Validators.required],
    groupPermission: ['', Validators.required],
  });

  constructor(
    private http: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  toastService = inject(ToastsService);

  ngOnInit(): void {
    this.loadPermissions();
    this.loadGroupPermissions();
  }

  handleItemsPerPage(event: Event): void {
    const option = event.target as HTMLSelectElement;
    this.limit = parseInt(option.value);
    this.loadPermissions();
  }

  setInputType(type: string) {
    this.inputType = type;
    this.addPermissionForm.controls['groupPermission'].reset();
  }

  onSubmitSearch(search: string): void {
    this.search = search;
    this.loadPermissions();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.http.getItems('/permissions', '', this.currentPage, this.limit, '', '').subscribe((response: any) => {
        response = response.data;
        this.items = response['result'].slice();
        this.pages = response['pages'];
      });
  }

  onAddPermission(): void {}

  onEditPermission(permission: any): void {
    this.selectedPermission = { ...permission };

    // Populate the form with selected permission data
    this.editPermissionForm.patchValue({
      editPermissionName: permission.name,
      groupPermission: permission.groupPermission.id
    });
  }

  onDeletePermission(permission: any): void {
      this.selectedPermission = { ...permission };
    }
  
  loadGroupPermissions(): void {
    this.http.getItems('/permissions/groupper', '', 0, 0, '', '').subscribe((response: any) => {
      this.GroupPermissions = response.data;
    });
  }

  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  }

  onAddPermSubmit() {
    if (this.addPermissionForm.valid) {
      this.http.createItem("permissions", this.addPermissionForm.value).subscribe({
        next: (data: any) => {
          setTimeout(() => {
            this.toastService.show({template: data.message, classname: "toast--success", delay: 4000});
            this.closeModal('addPermissionModal');
            this.loadPermissions();
          }, 300);
        },
        error: (error: any) => {
          this.errors = error["error"]["data"]["errors"];
          this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 5000}));
        }
      });
    }
  }

  onEditPermSubmit() {
    if (this.editPermissionForm.valid) {
      const updatedPermission = this.editPermissionForm.value;
      this.http.updateItem('permissions', updatedPermission, this.selectedPermission.id).subscribe({
        next: (data: any) => {
          this.toastService.show({template: data.message, classname: "toast--success", delay: 4000});
          this.closeModal('editPermissionModal');
          this.loadPermissions();
        },
        error: (error: any) => {
          this.errors = error["error"]["data"]["errors"];
          this.errors.forEach((error) => this.toastService.show({template: error.message, classname: "toast--error", delay: 5000}));
        }
      });
    }
  }

  confirmDeletePerm(): void {
    console.log('this.selectedPermission.id', this.selectedPermission.id);
    const permId = { ids: [this.selectedPermission.id] };
    this.http.deleteItem(`/permissions`, permId).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.toastService.show({ template: data.message, classname: "toast--success", delay: 4000 });
          this.closeModal('deletePermissionModal');
          this.loadPermissions();
        }, 300);
      },
      error: (error: any) => {
        const errors = error["error"]["data"]["errors"];
        errors.forEach((err: any) => {
          this.toastService.show({ template: err["message"], classname: "toast--error", delay: 5000 });
        });
      }
    });
  }
}
