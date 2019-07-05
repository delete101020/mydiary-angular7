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

  frameworkList = [];
  frameworks = [];
  selectedFrameworks = [];

  userList = [];
  users = [];
  selectedUsers = [];
  leader: 0;
  manager: 0;

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
    this.getFrameworks();
    this.getUsers();

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
        this.element.id = data.id;
        this.element.name = data.name;
        this.element.desc = data.desc;
        this.element.startDate = data.startDate;
        this.element.endDate = data.endDate;
        this.element.status = data.status;
        this.element.estimatedTime = data.estimatedTime;
        this.element.totalSpentTime = data.totalSpentTime;
        this.element.estimatedDura = data.estimatedDura;
        this.element.clientId = data.clientId;
        this.element.frameworks = data.frameworks.map(f => f.id);
        this.element.users = data.users;

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
    this.desc = this.element.desc;
    this.element.frameworks.forEach(id => this.selectFramework(id));
    this.element.users.forEach(user => {
      this.selectUser(user.id);
      this.leader = user.roles.leader ? user.id : this.leader;
      this.manager = user.roles.manager ? user.id : this.manager;
    });
  }

  beforeSave() {
    this.projectForm.get('desc').setValue(this.desc);
    this.element = this.projectForm.value;
    this.element.users = [];
    this.element.frameworks = this.selectedFrameworks;

    this.selectedUsers.forEach(id => {
      const user = { 'userId': id, 'leader': this.leader === id ? 1 : 0, 'manager': this.manager === id ? 1 : 0 };
      this.element.users.push(user);
    });
    this.config.data = this.element;
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

  // Multi select
  remove(array: number[], value: number) {
    array.forEach( (v, i) => {
      if (v === value) {
        array.splice(i, 1);
      }
    });
  }

  sortArray(array1: number[], array2: number[]) {
    array1.sort();
    array2.sort();
  }

  selectOption(src: number[], des: number[], id: number) {
    des.push(id);
    this.remove(src, id);
    this.sortArray(src, des);
  }

  findName(array: any[], id: number) {
    return array.find(e => e.id === id).name;
  }

  getFrameworks() {
    this.dataService.getList({table: 'framework'})
      .subscribe(res => {
        res.map(framework => {
          this.frameworkList.push({ id: framework.id, name: framework.name});
          this.frameworks.push(framework.id);
        });
      });
  }

  selectFramework(id: number) {
    this.selectOption(this.frameworks, this.selectedFrameworks, id);
  }

  deselectFramework(id: number) {
    this.selectOption(this.selectedFrameworks, this.frameworks, id);
  }

  getUsers() {
    this.dataService.getList({table: 'user'})
      .subscribe(res => {
        res.map(user => {
          this.userList.push({ id: user.id, name: user.name});
          this.users.push(user.id);
        });
      });
  }

  selectUser(id: number) {
    this.selectOption(this.users, this.selectedUsers, id);
  }

  deselectUser(id: number) {
    this.selectOption(this.selectedUsers, this.users, id);
    if (this.selectedUsers.length === 0) {
      this.leader = 0;
      this.manager = 0;
    }
  }

  changeLeader(event: any) {
    this.leader = event;
  }

  changeManager(event: any) {
    this.manager = event;
  }

}
