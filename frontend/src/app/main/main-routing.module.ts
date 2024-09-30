import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LanguagePageComponent } from './pages/language-page/language-page.component';
import { ViewDetailComponent } from './pages/view-detail/components/view-detail/view-detail.component';
import { MyProfilePageComponent } from './pages/my-profile-page/components/my-profile-page/my-profile-page.component';
import { MainComponent } from './main.component';
import { AddUsersComponent } from './pages/add-users/add-users.component';
import { authGuard } from '../auth/auth.guard';
import { RolesComponent } from './pages/roles/roles.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { InactivePageComponent } from './pages/inactive-page/inactive-page.component';
  
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'users/list', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
      { path: 'categories/list', component: CategoryPageComponent, canActivate: [authGuard] },
      { path: 'users/list', component: UserPageComponent, canActivate: [authGuard] },
      { path: 'users/add', component: AddUsersComponent, canActivate: [authGuard] },
      { path: 'users/view-detail/:id', component: ViewDetailComponent, canActivate: [authGuard] },
      { path: 'languages/list', component: LanguagePageComponent, canActivate: [authGuard] },
      { path: 'my-profile', component: MyProfilePageComponent, canActivate: [authGuard] },
      { path: 'role&permission/role', component: RolesComponent, canActivate: [authGuard] },
      { path: 'role&permission/permission', component: PermissionsComponent, canActivate: [authGuard] },
      { path: 'access-denied', component: AccessDeniedComponent},
      { path: 'inactive-page', component: InactivePageComponent},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
