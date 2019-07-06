import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Config, ITool } from '../../../../shared/models';
import { DataService } from '../../../../shared/services';
import { AuthService } from '../../../../auth/auth.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: []
})
export class ToolDetailComponent implements OnInit {

  element: ITool = { id: 0, desc: '', advantages: '', defects: '' };
  config: Config = { table: 'tool', id: 0 };

  canCreate = false;
  canEdit = false;

  public descEditor = ClassicEditor;
  public advantagesEditor = ClassicEditor;
  public defectsEditor = ClassicEditor;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.canDoIt();

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

  getDetail() {
    return this.dataService.getDetail(this.config)
      .subscribe(data => this.element = data);
  }

  save() {
    this.config.data = this.element;
    if (this.config.id === 0) {
      this.addElement();
    } else {
      this.updateElement();
    }
  }

  addElement() {
    return this.dataService.createData(this.config)
      .subscribe(res => this.router.navigate(['/tool/list']));
  }

  updateElement() {
    return this.dataService.editData(this.config)
      .subscribe(res => this.router.navigate(['/tool/list']));
  }

  goBack() {
    this.location.back();
  }

}
