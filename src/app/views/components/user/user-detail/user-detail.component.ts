import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '../../../../helpers';

import { Config, IUser } from '../../../../shared/models';
import { DataService, UploadService } from '../../../../shared/services';
import { AuthService } from '../../../../auth/auth.service';
import { ExportService } from '../../../../shared/services';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: []
})
export class UserDetailComponent implements OnInit {

  element: IUser = { id: 0, gender: false, marital: false };
  config: Config = { table: 'user', id: 0 };

  canCreate = false;
  canEdit = false;

  userForm: FormGroup;

  public advantagesEditor = ClassicEditor;
  advantages = '';
  public defectsEditor = ClassicEditor;
  defects = '';
  public hobbiesEditor = ClassicEditor;
  hobbies = '';

  avatar: File;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private uploadService: UploadService,
    private exportService: ExportService,
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

  getDetail() {
    return this.dataService.getDetail(this.config)
      .subscribe(data => {
        this.element = data;
        this.advantages = this.element.advantages;
        this.defects = this.element.defects;
        this.hobbies = this.element.hobbies;
        this.updateFormValue(this.element);
      });
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      name: [{value: '', disabled: !this.canEdit}],
      email: [{value: '', disabled: !this.canEdit}, [Validators.required, Validators.email]],
      password: [{value: '', disabled: !this.canEdit}, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      retypePassword: [{value: '', disabled: !this.canEdit}, Validators.required],
      phone: [{value: '', disabled: !this.canEdit}],
      gender: [{value: false, disabled: !this.canEdit}],
      birthday: [{value: '', disabled: !this.canEdit}],
      address: [{value: '', disabled: !this.canEdit}],
      avatar: [{value: '', disabled: !this.canEdit}],
      advantages: [{value: '', disabled: !this.canEdit}],
      defects: [{value: '', disabled: !this.canEdit}],
      hobbies: [{value: '', disabled: !this.canEdit}],
      marital: [{value: '', disabled: !this.canEdit}],
      urlFb: [{value: '', disabled: !this.canEdit}]
    }, {
      validators: MustMatch('password', 'retypePassword')
    });
  }

  updateFormValue(element: IUser) {
    this.userForm.patchValue({
      name: element.name,
      email: element.email,
      password: element.password,
      phone: element.phone,
      gender: element.gender,
      birthday: element.birthday,
      address: element.address,
      marital: element.marital,
      urlFb: element.urlFB
    });
    this.userForm.get('email').disable();
  }

  canDoIt() {
    const url = '/' + this.config.table + '/';
    this.canCreate = this.authService.checkRole(url + 'create');
    this.canEdit = this.authService.checkRole(url + 'edit');
  }

  onChangeImage(event) {
    this.avatar = event.target.files[0];
  }

  async uploadImage() {
    let path = this.element.avatar;
    if (this.avatar) {
      path = await this.uploadService.upload(this.avatar);
    }
    return path;
  }

  async beforeSave() {
    this.element.avatar = await this.uploadImage();

    this.userForm.get('avatar').setValue(this.element.avatar);
    this.userForm.get('advantages').setValue(this.advantages);
    this.userForm.get('defects').setValue(this.defects);
    this.userForm.get('hobbies').setValue(this.hobbies);
    const data = this.userForm.value;
    if (!data.email) {
      data.email = this.element.email;
    }
    this.config.data = data;
  }

  async save() {
    await this.beforeSave();
    if (this.config.id === 0) {
      this.addElement();
    } else {
      this.updateElement();
    }
  }

  addElement() {
    return this.dataService.createData(this.config)
      .subscribe(res => {
        this.router.navigate(['/user/list']);
      });
  }

  updateElement() {
    return this.dataService.editData(this.config)
      .subscribe(res => {
        this.router.navigate(['/user/list']);
      });
  }

  goBack() {
    this.location.back();
  }

  // Form validation in template
  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get retypePassword() {
    return this.userForm.get('retypePassword');
  }

  exportPdf() {
    const fileName = 'user-detail';
    const title = 'User Detail';
    const data = this.element;
    this.exportService.generatePdf(fileName, title, data);
  }
}
