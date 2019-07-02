import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Config, IFramework } from '../../../../shared/models';
import { DataService } from '../../../../shared/services';
import { AuthService } from '../../../../auth/auth.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-framework-detail',
  templateUrl: './framework-detail.component.html',
  styleUrls: []
})
export class FrameworkDetailComponent implements OnInit {

  element: IFramework = { id: 0 };
  config: Config = { table: 'framework', id: 0 };

  canCreate = false;
  canEdit = false;

  frameworkForm: FormGroup;
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
    this.frameworkForm = this.formBuilder.group({
      name: [{value: '', disabled: !this.canEdit}, Validators.required],
      summary: [{value: '', disabled: !this.canEdit}],
      desc: [{value: '', disabled: !this.canEdit}],
      researchDate: [{value: '', disabled: !this.canEdit}],
      url: [{value: '', disabled: !this.canEdit}]
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

  updateFormValue(element: IFramework) {
    this.frameworkForm.patchValue({
      name: element.name,
      summary: element.summary,
      desc: element.desc,
      researchDate: element.researchDate,
      url: element.url
    });
  }

  beforeSave() {
    this.frameworkForm.get('desc').setValue(this.desc);
    const data = this.frameworkForm.value;
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
        this.router.navigate(['/framework/list']);
      });
  }

  updateElement() {
    return this.dataService.editData(this.config)
      .subscribe(
        () => this.router.navigate(['/framework/list']),
        err => alert(err)
      );
  }

  goBack() {
    this.location.back();
  }

  // Template Form Validation
  get name() {
    return this.frameworkForm.get('name');
  }

}
