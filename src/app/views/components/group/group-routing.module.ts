import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes = [
  { path: 'list', component: GroupComponent, data: { title: 'Group List' }},
  { path: 'detail/:id', component: GroupDetailComponent, data: { title: 'Group Detail' }},
  { path: 'create', component: GroupDetailComponent, data: { title: 'New Group' }},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
