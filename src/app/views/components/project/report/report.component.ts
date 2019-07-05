import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Config, IReport } from '../../../../shared/models';
import { DataService } from '../../../../shared/services';

@Component({
  selector: 'app-project-report',
  templateUrl: './report.component.html',
  styleUrls: []
})
export class ReportComponent implements OnInit {

  list$: Observable<IReport[]>;
  selectedElement: IReport = { id: 0 };
  config: Config = {
    parentTable: 'project',
    parentId: 0,
    table: 'report',
    id: 0
  };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.config.parentId = +this.route.snapshot.paramMap.get('id');
    if (this.config.parentId !== 0) {
      this.loadList();
    }
  }

  loadList() {
    this.list$ = this.dataService.getList(this.config);
  }

  onSelect(element: IReport) {
    console.log('Selected element with id ' + element.id);
    this.selectedElement = element;
  }

}
