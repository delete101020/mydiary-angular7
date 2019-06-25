import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicComponent } from './music/music.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';

const routes: Routes = [
  { path: 'list', component: MusicComponent, data: { title: 'Music List' }},
  { path: 'detail/:id', component: MusicDetailComponent, data: { title: 'Music Detail' }},
  { path: 'create', component: MusicDetailComponent, data: { title: 'New Music'}},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
