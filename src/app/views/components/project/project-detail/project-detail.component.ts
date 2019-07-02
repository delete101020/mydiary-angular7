import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Config, IProject } from '../../../../shared/models';
import { DataService } from '../../../../shared/services';
import { AuthService } from '../../../../auth/auth.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: []
})
export class ProjectDetailComponent implements OnInit {

  element: IProject = { id: 0 };
  config: Config = { table: 'project', id: 0 };

  canCreate = false;
  canEdit = false;

  projectForm: FormGroup;
  public descEditor = ClassicEditor;
  desc = '';

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.canDoIt();
    this.buildForm();
    this.config.id = +this.route.snapshot.paramMap.get('id');
    if (this.config.id !== 0) {
      this.getDetail();
    }
  }

  canDoIt() {
    const url = '/' + this.config.table + '/';
    this.canCreate = this.authService.checkRole(url + 'create');
    this.canEdit = this.authService.checkRole(url + 'edit');
  }

  buildForm() {
    this.projectForm = this.formBuilder.group({
      name: [{value: '', disabled: !this.canEdit}, Validators.required],
      desc: [{value: '', disabled: !this.canEdit}],
      startDate: [{value: '', disabled: !this.canEdit}],
      endDate: [{value: '', disabled: !this.canEdit}],
      status: [{value: '', disabled: !this.canEdit}],
      estimatedTime: [{value: '', disabled: !this.canEdit}, Validators.min(1)],
      totalSpentTime: [{value: '', disabled: !this.canEdit}, Validators.min(0)],
      estimatedDura: [{value: '', disabled: !this.canEdit}, Validators.min(1)],
    });
  }

  getDetail() {
    return this.dataService.getDetail(this.config)
      .subscribe(data => {
        this.element = data;
        this.desc = this.element.desc;
        this.updateFormValue(this.element);
      });
  }

  updateFormValue(element: IProject) {
    this.projectForm.patchValue({
      name: element.name,
      desc: element.desc,
      startDate: element.startDate,
      endDate: element.endDate,
      status: element.status,
      estimatedTime: element.estimatedTime,
      totalSpentTime: element.totalSpentTime,
      estimatedDura: element.estimatedDura
    });
  }

  beforeSave() {
    this.projectForm.get('desc').setValue(this.desc);
    const data = this.projectForm.value;
    this.config.data = data;
  }

  save() {
    this.beforeSave();
    if (this.config.id === 0) {
      this.addElement();
    } else {
      this.updateElement();
    }
  }

  addElement() {
    return this.dataService.createData(this.config)
      .subscribe(res => {
        this.router.navigate(['/project/list']);
      });
  }

  updateElement() {
    return this.dataService.editData(this.config)
      .subscribe(res => {
        this.router.navigate(['/project/list']);
      });
  }

  goBack() {
    this.location.back();
  }

  // For validators in template
  get name() {
    return this.projectForm.get('name');
  }

  get estimatedTime() {
    return this.projectForm.get('estimatedTime');
  }

  get totalSpentTime() {
    return this.projectForm.get('totalSpentTime');
  }

  get estimatedDura() {
    return this.projectForm.get('estimatedDura');
  }

}
