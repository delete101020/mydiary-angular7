import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrameworkComponent } from './framework/framework.component';
import { FrameworkDetailComponent } from './framework-detail/framework-detail.component';

const routes: Routes = [
  { path: 'list', component: FrameworkComponent, data: { title: 'Framework List' }},
  { path: 'detail/:id', component: FrameworkDetailComponent, data: { title: 'Framework Detail' }},
  { path: 'create', component: FrameworkDetailComponent, data: { title: 'New Framework' }},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameworkRoutingModule { }
