import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceComponent } from './finance/finance.component';
import { FinanceDetailComponent } from './finance-detail/finance-detail.component';

const routes: Routes = [
  { path: 'list', component: FinanceComponent, data: { title: 'Finance List' }},
  { path: 'detail/:id', component: FinanceDetailComponent, data: { title: 'Finance Detail' }},
  { path: 'create', component: FinanceDetailComponent, data: { title: 'New Finance'}},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
