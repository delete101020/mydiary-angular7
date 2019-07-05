import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { AuthService } from '../../../../auth/auth.service';
import { Config, IGroup } from '../../../../shared/models';
import { DataService } from '../../../../shared/services';
import { ROLES } from '../../../../shared/list';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: []
})
export class GroupDetailComponent implements OnInit {

  config: Config = { table: 'group', id: 0 };
  element: IGroup = { id: 0, users: [] };

  canCreate = false;
  canEdit = false;

  groupForm: FormGroup;
  roles = [];
  raw = ROLES;
  userList = [];
  selectUserList = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit() {
    this.canDoIt();

    this.groupForm = this.formBuilder.group({
      name: [{ value: '', disabled: !this.canEdit}, Validators.required],
      roles: new FormArray([]),
    });

    of(this.getRoles()).subscribe(roles => {
      this.roles = roles;
      this.addCheckboxes();
    });

    this.config.id = +this.route.snapshot.paramMap.get('id');
    if (this.config.id !== 0) {
      this.getDetail();
    }

    this.getUserList();
  }

  // Working with Checkboxes
  addCheckboxes() {
    this.getRoles().map((r, i) => {
      const control = new FormControl({ value: false, disabled: false });
      (this.groupForm.controls.roles as FormArray).push(control);
    });
  }

  updateCheckboxes() {
    this.getRoles().map((r, i) => {
      if (this.hasRole(this.roles[i])) {
        (this.groupForm.controls.roles as FormArray).at(i).patchValue(true);
        if (!this.canEdit) {
          this.groupForm.controls.roles.disable();
        }
      }
    });
  }

  getSelectedRoles() {
    const selectedRoles = this.groupForm.value.roles
      .map((r, i) => r ? this.roles[i] : null)
      .filter(r => r !== null);
    return selectedRoles;
  }

  // Compare group roles with all roles
  getRoles() {
    const roleList = [];
    this.raw.forEach(line => {
      line.roles.forEach(role => roleList.push(role));
    });
    return roleList;
  }

  hasRole(role: string) {
    const roles = this.element.role;
    if (roles) {
      return roles.includes(role);
    }
    return false;
  }

  // Working with data
  getDetail() {
    return this.dataService.getDetail(this.config)
      .subscribe(data => {
        this.element.name = data.name;
        this.groupForm.patchValue({
          name: data.name
        });
        this.element.role = data.role;
        if (data.users) {
          data.users.forEach(user => this.selectUserList.push(user.id));
        }
        this.updateCheckboxes();
      });
  }

  beforeSave() {
    this.element.name = this.groupForm.value.name;
    this.element.role = this.getSelectedRoles().toString();
    this.element.users = this.selectUserList;
    this.config.data = this.element;
  }

  save() {
    this.beforeSave();
    if (this.config.id === 0 && this.canCreate) {
      this.addElement();
    } else if (this.canEdit) {
      this.updateElement();
    }
  }

  addElement() {
    return this.dataService.createData(this.config)
      .subscribe(res => {
        this.router.navigate(['group/list']);
      });
  }

  updateElement() {
    return this.dataService.editData(this.config)
      .subscribe(res => {
        this.router.navigate(['/group/list']);
      });
  }

  goBack(): void {
    this.location.back();
  }

  canDoIt() {
    const url = '/' + this.config.table + '/';
    this.canCreate = this.authService.checkRole(url + 'create');
    this.canEdit = this.authService.checkRole(url + 'edit');
  }

  // Multi select
  remove(array: number[], value: number) {
    array.forEach( (v, i) => {
      if (v === value) {
        array.splice(i, 1);
      }
    });
  }

  sortUsers() {
    this.userList.sort();
    this.selectUserList.sort();
  }

  selectUser(id: number) {
    this.selectUserList.push(id);
    this.remove(this.userList, id);
    this.sortUsers();
  }

  deselectUser(id: number) {
    this.userList.push(id);
    this.remove(this.selectUserList, id);
    this.sortUsers();
  }

  getUserList() {
    this.dataService.getList({table: 'user'})
      .subscribe(res => {
        res
          .filter(user => user.groupId === null)
          .map(user => this.userList.push(user.id));
      });
  }

}
