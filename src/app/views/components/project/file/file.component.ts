import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { Config, IFile } from '../../../../shared/models';
import { AuthService } from '../../../../auth/auth.service';
import { DataService } from '../../../../shared/services';

@Component({
  selector: 'app-project-file',
  templateUrl: './file.component.html',
  styleUrls: []
})
export class FileComponent implements OnInit {

  @ViewChild('fileModal') public fileModal: ModalDirective;

  canDo = { canView: false, canCreate: false, canEdit: false, canDelete: false };

  list$: Observable<IFile[]>;
  selectedElement: IFile = { id: 0 };
  config: Config = {
    parentTable: 'project',
    parentId: 0,
    table: 'file',
    id: 0
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.canDoIt();
    this.config.parentId = +this.route.snapshot.paramMap.get('id');
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

  onSelect(element: IFile) {
    if (this.selectedElement === element) {
      this.selectedElement = { id: 0 };
    } else {
      this.selectedElement = element;
    }
  }

  onAdd() {
    this.selectedElement = { id: 0 };
    this.fileModal.show();
  }

  onEdit() {
    if (this.selectedElement.id === 0) {
      alert ('Choose record you want to edit by clicking on it');
    } else {
      this.fileModal.show();
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
    this.fileModal.hide();
    if (confirm('Are you sure to do ?')) {
      this.config.id = this.selectedElement.id;
      this.config.data = this.selectedElement;
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
