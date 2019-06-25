import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';

const routes: Routes = [
  { path: 'list', component: VideoComponent, data: { title: 'Video List' }},
  { path: 'detail/:id', component: VideoDetailComponent, data: { title: 'Video Detail' }},
  { path: 'create', component: VideoDetailComponent, data: { title: 'New Video'}},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
