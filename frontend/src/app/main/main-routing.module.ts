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
  
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
      { path: 'categories/list', component: CategoryPageComponent, canActivate: [authGuard] },
      { path: 'users/list', component: UserPageComponent, canActivate: [authGuard] },
      { path: 'users/add', component: AddUsersComponent, canActivate: [authGuard] },
      { path: 'users/view-detail/:id', component: ViewDetailComponent, canActivate: [authGuard] },
      { path: 'languages/list', component: LanguagePageComponent, canActivate: [authGuard] },
      { path: 'my-profile', component: MyProfilePageComponent, canActivate: [authGuard] },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
