import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolRoutingModule } from './tool-routing.module';
import { ToolComponent } from './tool/tool.component';
import { ToolDetailComponent } from './tool-detail/tool-detail.component';

@NgModule({
  declarations: [ToolComponent, ToolDetailComponent],
  imports: [
    CommonModule,
    ToolRoutingModule
  ]
})
export class ToolModule { }
