import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { RegisterComponent } from './views/register/register.component';

import { AuthGuard } from './helpers';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '404', component: P404Component, data: { title: 'Page 404' }},
  { path: '500', component: P500Component, data: { title: 'Page 500' }},
  { path: 'register', component: RegisterComponent, data: { title: 'Register Page' }},
  { path: '', component: DefaultLayoutComponent, data: { title: 'Home' }, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardModule' },
      { path: 'group', loadChildren: './views/components/group/group.module#GroupModule', canActivateChild: [AuthGuard] },
      { path: 'user', loadChildren: './views/components/user/user.module#UserModule', canActivateChild: [AuthGuard] },
      { path: 'client', loadChildren: './views/components/client/client.module#ClientModule', canActivateChild: [AuthGuard] },
      { path: 'project', loadChildren: './views/components/project/project.module#ProjectModule', canActivateChild: [AuthGuard] },
      { path: 'framework', loadChildren: './views/components/framework/framework.module#FrameworkModule', canActivateChild: [AuthGuard] },
      { path: 'account', loadChildren: './views/components/account/account.module#AccountModule', canActivateChild: [AuthGuard] },
      { path: 'diary', loadChildren: './views/components/diary/diary.module#DiaryModule', canActivateChild: [AuthGuard] },
      { path: 'finance', loadChildren: './views/components/finance/finance.module#FinanceModule', canActivateChild: [AuthGuard] },
      { path: 'music', loadChildren: './views/components/music/music.module#MusicModule', canActivateChild: [AuthGuard] },
      { path: 'tool', loadChildren: './views/components/tool/tool.module#ToolModule', canActivateChild: [AuthGuard] },
      { path: 'video', loadChildren: './views/components/video/video.module#VideoModule', canActivateChild: [AuthGuard] }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
