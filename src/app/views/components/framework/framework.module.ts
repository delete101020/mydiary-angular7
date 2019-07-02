import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FrameworkRoutingModule } from './framework-routing.module';
import { FrameworkComponent } from './framework/framework.component';
import { FrameworkDetailComponent } from './framework-detail/framework-detail.component';

@NgModule({
  declarations: [
    FrameworkComponent,
    FrameworkDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule.forRoot(),
    CKEditorModule,
    FrameworkRoutingModule
  ]
})
export class FrameworkModule { }
