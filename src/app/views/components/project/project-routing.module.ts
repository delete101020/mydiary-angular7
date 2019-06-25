import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [
  { path: 'list', component: ProjectComponent, data: { title: 'Project List' }},
  { path: 'detail/:id', component: ProjectDetailComponent, data: { title: 'Project Detail' }},
  { path: 'create', component: ProjectDetailComponent, data: { title: 'New Project' }},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
