import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { DiaryDetailComponent } from './diary-detail/diary-detail.component';

const routes: Routes = [
  { path: 'list', component: DiaryComponent, data: { title: 'Diary List' }},
  { path: 'detail/:id', component: DiaryDetailComponent, data: { title: 'Diary Detail' }},
  { path: 'create', component: DiaryDetailComponent, data: { title: 'New Diary'}},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
