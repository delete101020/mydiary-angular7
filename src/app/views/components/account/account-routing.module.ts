import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';

const routes: Routes = [
  { path: 'list', component: AccountComponent, data: { title: 'Account List' }},
  { path: 'detail/:id', component: AccountDetailComponent, data: { title: 'Account Detail' }},
  { path: 'create', component: AccountDetailComponent, data: { title: 'New Account' }},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
