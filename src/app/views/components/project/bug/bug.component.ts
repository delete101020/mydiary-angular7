import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { Config, IBug } from '../../../../shared/models';
import { AuthService } from '../../../../auth/auth.service';
import { DataService, UploadService } from '../../../../shared/services';

@Component({
  selector: 'app-project-bug',
  templateUrl: './bug.component.html',
  styleUrls: []
})
export class BugComponent implements OnInit {

  @ViewChild('bugModal') public bugModal: ModalDirective;

  canDo = { canView: false, canCreate: false, canEdit: false, canDelete: false };

  list$: Observable<IBug[]>;
  selectedElement: IBug = { id: 0 };
  config: Config = {
    parentTable: 'project',
    parentId: 0,
    table: 'bug',
    id: 0
  };
  image: File;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataService: DataService,
    private uploadService: UploadService
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

  onSelect(element: IBug) {
    this.selectedElement = element;
  }

  onChangeImage(event: any) {
    this.image = event.target.files[0];
  }

  onAdd() {
    this.selectedElement = { id: 0 };
    this.bugModal.show();
  }

  onEdit() {
    if (this.selectedElement.id === 0) {
      alert ('Choose record you want to edit by clicking on it');
    } else {
      this.bugModal.show();
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

  async uploadImage() {
    let path = this.selectedElement.image;
    if (this.image) {
      path = await this.uploadService.upload(this.image);
    }
    return path;
  }

  async onSave() {
    this.bugModal.hide();
    if (confirm('Are you sure to do ?')) {
      this.selectedElement.image = await this.uploadImage();
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

