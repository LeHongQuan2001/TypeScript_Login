import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NavComponent } from './layouts/nav/nav.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { LanguagePageComponent } from './pages/language-page/language-page.component';
import { AddUserComponent } from './features/add/add-user/components/add-user/add-user.component';
import { AddCategoryComponent } from './features/add/add-category/components/add-category/add-category.component';
import { AddLanguageComponent } from './features/add/add-language/components/add-language/add-language.component';
import { DeleteComponent } from './features/delete/delete/components/delete/delete.component';
import { PaginationComponent } from './features/pagination/components/pagination/pagination.component';
import { EditUserComponent } from './features/edit/edit-user/components/edit-user/edit-user.component';
import { EditCategoryComponent } from './features/edit/edit-category/components/edit-category/edit-category.component';
import { EditLanguageComponent } from './features/edit/edit-language/components/edit-language/edit-language.component';
import { ViewDetailComponent } from './pages/view-detail/components/view-detail/view-detail.component';
import { MyProfilePageComponent } from './pages/my-profile-page/components/my-profile-page/my-profile-page.component';
import { DeleteSuccessComponent } from './features/delete/delete-success/components/delete-success/delete-success.component';
import { DeleteFailedComponent } from './features/delete/delete-failed/delete-failed.component';
import { TranslateModule } from '@ngx-translate/core';
import { AddUsersComponent } from './pages/add-users/add-users.component';
import { SharedModule } from './shared/shared.module';
import { RolesComponent } from './pages/roles/roles.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';

@NgModule({
  declarations: [
    MainComponent,
    HomePageComponent,
    UserPageComponent,
    NavComponent,
    SideBarComponent,
    CategoryPageComponent,
    LanguagePageComponent,
    AddUserComponent,
    AddCategoryComponent,
    AddLanguageComponent,
    DeleteComponent,
    PaginationComponent,
    EditUserComponent,
    EditCategoryComponent,
    EditLanguageComponent,
    ViewDetailComponent,
    MyProfilePageComponent,
    DeleteSuccessComponent,
    DeleteFailedComponent,
    AddUsersComponent,
    RolesComponent,
    PermissionsComponent,
  ],
  imports: [
    MainRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forChild(),
  ],
  providers: [],
  bootstrap: [MainComponent],
})
export class MainModule {}
