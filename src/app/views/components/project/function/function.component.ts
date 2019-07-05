import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { Config, IFunction, IProject } from '../../../../shared/models';
import { AuthService } from '../../../../auth/auth.service';
import { DataService } from '../../../../shared/services';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-project-function',
  templateUrl: './function.component.html',
  styleUrls: []
})
export class FunctionComponent implements OnInit {

  @ViewChild('functionModal') public functionModal: ModalDirective;

  canDo = { canView: false, canCreate: false, canEdit: false, canDelete: false };

  list$: Observable<IFunction[]>;
  selectedElement: IFunction = { id: 0 };
  config: Config = {
    parentTable: 'project',
    parentId: 0,
    table: 'function',
    id: 0
  };

  public Editor = ClassicEditor;

  users: number[];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.canDoIt();
    this.config.parentId = +this.route.snapshot.paramMap.get('id');
    this.getUserList();
    if (this.config.parentId !== 0) {
      this.loadList();
    }
  }

  canDoIt() {
    const url = '/' + this.config.table + '/';
    this.canDo.canView = this.authService.checkRole(url + 'list');
    this.canDo.canCreate = this.authService.checkRole(url + 'create');
    this.canDo.canEdit = this.authService.checkRole(url + 'edit');
    this.canDo.canDelete = this.authService.checkRole(url + 'delete');
  }

  loadList() {
    this.list$ = this.dataService.getList(this.config);
  }

  getUserList() {
    this.dataService.getDetail({ table: 'project', id: this.config.parentId })
      .subscribe(res => {
        this.users = res.users.map(user => user.id);
      });
  }

  onSelect(element: IFunction) {
    if (this.selectedElement === element) {
      this.selectedElement = { id: 0 };
    } else {
      this.selectedElement = element;
    }
  }

  onAdd() {
    this.selectedElement = { id: 0 };
    this.selectedElement.desc = '';
    this.functionModal.show();
  }

  onEdit() {
    if (this.selectedElement.id === 0) {
      alert ('Choose record you want to edit by clicking on it');
    } else {
      this.functionModal.show();
    }
  }

  onDelete() {
    if (this.selectedElement.id === 0) {
      alert ('Choose record you want to delete by clicking on it');
    } else {
      if (confirm('Are you sure to delete this record ?')) {
        this.deleteElement(this.selectedElement.id);
      }
    }
  }

  onSave() {
    this.functionModal.hide();
    if (confirm('Are you sure to do ?')) {
      this.config.id = this.selectedElement.id;
      this.config.data = this.selectedElement;
      console.log(this.config.data);
      if (this.config.id === 0) {
        this.addElement();
      } else {
        this.updateElement();
      }
    }
  }

  addElement() {
    return this.dataService.createData(this.config)
      .subscribe(res => this.loadList());
  }

  updateElement() {
    return this.dataService.editData(this.config)
      .subscribe(res => this.loadList());
  }

  deleteElement(id: number) {
    this.config.id = id;
    this.dataService.deleteData(this.config)
      .subscribe(res => this.loadList());
  }

}
