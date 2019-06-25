import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworkRoutingModule } from './framework-routing.module';
import { FrameworkComponent } from './framework/framework.component';
import { FrameworkDetailComponent } from './framework-detail/framework-detail.component';

@NgModule({
  declarations: [FrameworkComponent, FrameworkDetailComponent],
  imports: [
    CommonModule,
    FrameworkRoutingModule
  ]
})
export class FrameworkModule { }
