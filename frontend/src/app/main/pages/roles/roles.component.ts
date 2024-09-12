import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/httpApi/api.service';

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
  roles: Role[] = [];
  selectedRole: any = {}; 
  permissions: { [key: string | number]: Permission[] } = {};
  addRolePermissions: { [key: number]: { [action: string]: boolean } } = {};
  editRolePermissions: { [key: number]: { [action: string]: boolean } } = {};
  newRole: { name: string } = { name: '' };
  maxAvatarsToShow: number = 4;

  constructor(private http: ApiService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadPermissions(callback: () => void): void {
    this.http.getItems("/permissions", '', 0, 0, '', '').subscribe((response: any) => {
      const permissionsData = response.data;
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
    const selectedPermissions = this.addRolePermissions;
    console.log('Submitting new role with permissions:', selectedPermissions);
    // Handle the submission for adding new role
  }

  onEditRoleSubmit(): void {
    const selectedPermissions = this.editRolePermissions;
    console.log('Submitting edited role with permissions:', selectedPermissions);
    // Handle the submission for editing role
  }
}
