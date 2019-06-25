import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolComponent } from './tool/tool.component';
import { ToolDetailComponent } from './tool-detail/tool-detail.component';

const routes: Routes = [
  { path: 'list', component: ToolComponent, data: { title: 'Tool List' }},
  { path: 'detail/:id', component: ToolDetailComponent, data: { title: 'Tool Detail' }},
  { path: 'create', component: ToolDetailComponent, data: { title: 'New Tool' }},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolRoutingModule { }
