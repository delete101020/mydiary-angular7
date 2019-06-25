import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

const routes: Routes = [
  { path: 'list', component: ClientComponent, data: { title: 'Client List' }},
  { path: 'detail/:id', component: ClientDetailComponent, data: { title: 'Client Detail' }},
  { path: 'create', component: ClientDetailComponent, data: { title: 'New Client' }},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
