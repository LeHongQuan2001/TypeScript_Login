import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/httpApi/api.service';
import { NgForm } from '@angular/forms';
import { ToastsService } from '../../features/toasts/toasts.service';
import { Router } from '@angular/router';

interface User {
  id: number;
  username: string;
  avatar: string;
}

interface Permission {
  groupPermission: any;
  id: number;
  name: string;
  groupId: number;
  actions?: string[];
}

interface Role {
  id: number;
  name: string;
  userCount: number;
  users: User[];
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  @ViewChild('addRoleForm') addRoleForm!: NgForm;
  @ViewChild('editRoleForm') editRoleForm!: NgForm;
  @ViewChild('deleteRoleModal') deleteRoleModal!: ElementRef;
  
  
  roles: Role[] = [];
  selectedRole: any = {}; 
  permissions: { [key: string | number]: Permission[] } = {};
  addRolePermissions: { [key: number]: { [action: string]: boolean } } = {};
  editRolePermissions: { [key: number]: { [action: string]: boolean } } = {};
  maxAvatarsToShow: number = 4;

  errors: any[] = []

  constructor(private http: ApiService, private router: Router) {}

  toastService = inject(ToastsService);

  ngOnInit(): void {
    this.loadRoles();
  }

  loadPermissions(callback: () => void): void {
    this.http.getItems("/permissions", '', 1, 1000, '', '').subscribe((response: any) => {
      const permissionsData = response.data.result;
      const groupedPermissions: { [key: number]: Permission[] } = {};
      permissionsData.forEach((permission: Permission) => {
        const groupId = permission.groupPermission.id;
        if (!groupedPermissions[groupId]) {
          groupedPermissions[groupId] = [];
        }
        groupedPermissions[groupId].push(permission);

        this.addRolePermissions[permission.id] = {};
        this.editRolePermissions[permission.id] = {};
        permission.actions?.forEach((action: string) => {
          this.addRolePermissions[permission.id][action] = false;
          this.editRolePermissions[permission.id][action] = false;
        });
      });

      this.permissions = groupedPermissions;
      if (callback) callback();
    });
  }

  loadRoles(): void {
    this.http.getItems("/roles", '', 0, 0, '', '').subscribe((response: any) => {
      this.roles = response.data.result;
    });
  }

  onEditRole(role: any): void {
    this.selectedRole = { ...role };
    this.editRolePermissions = {};
  
    this.loadPermissions(() => {
      if (this.selectedRole.rolePermission) {
        this.selectedRole.rolePermission.forEach((rolePerm: any) => {
          const permId = rolePerm.permissionId;
          if (!this.editRolePermissions[permId]) {
            this.editRolePermissions[permId] = {};
          }
          this.editRolePermissions[permId]['action'] = true;
        });
      }
    });
  }

  onAddRole(): void {
    this.loadPermissions(() => {
      this.addRolePermissions = {};
      Object.keys(this.permissions).forEach(groupId => {
        this.permissions[groupId].forEach(permission => {
          this.addRolePermissions[permission.id] = {};
          permission.actions?.forEach(action => {
            this.addRolePermissions[permission.id][action] = false;
          });
        });
      });
    });
  }

  onCheckboxChange(permissionId: number, action: string, event: Event, isEditMode: boolean): void {
    const checked = (event.target as HTMLInputElement).checked;
    const rolePermissions = isEditMode ? this.editRolePermissions : this.addRolePermissions;

    if (!rolePermissions[permissionId]) {
      rolePermissions[permissionId] = {};
    }
    rolePermissions[permissionId][action] = checked;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getDisplayedAvatars(users: User[]): User[] {
    return users.slice(0, this.maxAvatarsToShow);
  }

  getAdditionalCount(users: User[]): number {
    return users.length > this.maxAvatarsToShow ? users.length - this.maxAvatarsToShow : 0;
  }

  onAddRoleSubmit(): void {
    if (this.addRoleForm.valid) {
      const formData = this.addRoleForm.value;
      const permissionIdsWithTrueAction = Object.keys(this.addRolePermissions)
        .filter(permissionId => 
          Object.values(this.addRolePermissions[+permissionId]).includes(true)
        )
        .map(permissionId => +permissionId);
  
      const rolePermissionsObject = {
        name: formData.roleName,
        permissionIds: permissionIdsWithTrueAction
      };
  
      this.http.createItem("roles", rolePermissionsObject).subscribe({
        next: (data: any) => {
          setTimeout(() => {
            this.toastService.show({template: data["message"], classname: "toast--success", delay: 4000});
            this.closeModal('addRoleModal');
            this.loadRoles();
          }, 300);
        },
        error: (error: any) => {
          this.errors = error["error"]["data"]["errors"];
          this.errors.forEach((error) => this.toastService.show({template: error["message"], classname: "toast--error", delay: 5000}));
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  onEditRoleSubmit(): void {
    if (this.editRoleForm.valid) {
      const formData = this.editRoleForm.value;
  
      const permissionIdsWithTrueAction = Object.keys(this.editRolePermissions)
        .filter(permissionId =>
          Object.values(this.editRolePermissions[+permissionId]).includes(true)
        )
        .map(permissionId => +permissionId);
  
      const updatedRoleData = {
        name: formData.roleName,
        permissionIds: permissionIdsWithTrueAction
      };
  
      this.http.updateItem("roles", updatedRoleData, this.selectedRole.id).subscribe({
        next: (data: any) => {
          setTimeout(() => {
            this.toastService.show({template: data["message"], classname: "toast--success", delay: 4000});
            this.closeModal('editRoleModal');
            this.loadRoles();
          }, 300);
        },
        error: (error: any) => {
          this.errors = error["error"]["data"]["errors"];
          this.errors.forEach((error) =>
            this.toastService.show({template: error["message"], classname: "toast--error", delay: 5000})
          );
        }
      });
    } else {
      console.log('Form is not valid');
      this.editRoleForm.control.markAllAsTouched();
    }
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

  onDeleteRole(): void {
    this.closeModal('editRoleModal');
    const modalElement = document.getElementById('deleteRoleModal');
    if (modalElement) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (bootstrapModal) {
        bootstrapModal.show();
      } else {
        const newModalInstance = new (window as any).bootstrap.Modal(modalElement);
        newModalInstance.show();
      }
    } else {
      console.error('Modal element not found');
    }
  }
  
  confirmDeleteRole(): void {
    const roleId = { ids: [this.selectedRole.id] };
    this.http.deleteItem(`/roles`, roleId).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.toastService.show({ template: data["message"], classname: "toast--success", delay: 4000 });
          this.closeModal('deleteRoleModal');
          this.loadRoles();
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
