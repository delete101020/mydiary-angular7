import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule.forRoot(),
    CKEditorModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
