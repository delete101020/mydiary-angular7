import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { BugComponent } from './bug/bug.component';
import { FileComponent } from './file/file.component';
import { FunctionComponent } from './function/function.component';
import { ReportComponent } from './report/report.component';
import { FrameworkComponent } from './framework/framework.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
    BugComponent,
    FileComponent,
    FunctionComponent,
    ReportComponent,
    FrameworkComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
