import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

@NgModule({
  declarations: [GroupComponent, GroupDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }
