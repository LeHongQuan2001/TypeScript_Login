import { Component } from '@angular/core';
import { ApiService } from '../../shared/httpApi/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  responseData: any[] = [];
  roles: any[] = [];
  permissions: any[] = [];
  totalPeople: number = 0;
  maxAvatarsToShow: number = 4;

  constructor( private http: ApiService, private router: Router) {
  }


  ngOnInit(): void { 
    this.loadItems();
  };

  loadItems() {
    this.http.getItems("/role", '', 0, 0, '', '').subscribe((response) => {
        this.roles = response.data.result;
        console.log(this.roles);
    })
  }

  getDisplayedAvatars(users: any[]): any[] {
    return users.slice(0, this.maxAvatarsToShow);
  }

  getAdditionalCount(users: any[]): number {
    return users.length > this.maxAvatarsToShow ? users.length - this.maxAvatarsToShow : 0;
  }

  onSubmit() {}
}
