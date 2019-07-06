import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToolRoutingModule } from './tool-routing.module';
import { ToolComponent } from './tool/tool.component';
import { ToolDetailComponent } from './tool-detail/tool-detail.component';

import { DataTablesModule } from 'angular-datatables';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [ToolComponent, ToolDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    CKEditorModule,
    ToolRoutingModule
  ],
})
export class ToolModule { }
