import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { JobComponent } from './job/job.component';
import { SkillComponent } from './skill/skill.component';

@NgModule({
  declarations: [UserComponent, UserDetailComponent, JobComponent, SkillComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
    UserRoutingModule
  ]
})
export class UserModule { }
