import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../auth/auth.service';
import { Config, ITool } from '../../../../shared/models';
import { DataService } from '../../../../shared/services';
import { ExportService } from '../../../../shared/services';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: []
})
export class ToolComponent implements OnInit {

  canView = false;
  canDelete = false;

  config: Config = { table: 'tool' };
  list$: Observable<ITool[]>;
  data: any[];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private exportService: ExportService
  ) { }

  ngOnInit() {
    this.canDoIt();
    this.getList();
  }

  getList() {
    this.list$ = this.dataService.getList(this.config);
    this.list$.subscribe(l => this.data = l);
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

  exportTo(type: string) {
    const title = 'Tool List';
    const headers = this.data.map(e => Object.keys(e))[0];
    const data = this.data.map(e => Object.values(e));
    switch (type) {
      case 'excel': this.exportService.generateExcel('tool-list', title, headers, data); break;
      case 'csv': this.exportService.generateCsv('tool-list', title, headers, data); break;
    }
  }

}
