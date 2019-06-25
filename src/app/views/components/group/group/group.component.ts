import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../auth/auth.service';
import { Config, IGroup } from '../../../../shared/models';
import { DataService } from '../../../../shared/services';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: []
})
export class GroupComponent implements OnInit {

  canView = false;
  canDelete = false;

  config: Config = { table: 'group' };
  list$: Observable<IGroup[]>;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.canDoIt();
    this.getList();
  }

  getList() {
    this.list$ = this.dataService.getList(this.config);
  }

  canDoIt() {
    const url = '/' + this.config.table + '/';
    this.canView = this.authService.checkRole(url + 'detail/');
    this.canDelete = this.authService.checkRole(url + 'delete');
  }

  deleteElement(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.config.id = id;
      this.dataService.deleteData(this.config)
        .subscribe(() => this.getList());
    }
  }

}
