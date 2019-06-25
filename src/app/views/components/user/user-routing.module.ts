import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: 'list', component: UserComponent, data: { title: 'User List' }},
  { path: 'detail/:id', component: UserDetailComponent, data: { title: 'User Detail' }},
  { path: 'create', component: UserDetailComponent, data: { title: 'New User' }},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
