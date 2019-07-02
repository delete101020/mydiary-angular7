import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Config, IJob } from '../../../../shared/models';
import { DataService } from '../../../../shared/services';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: []
})
export class JobComponent implements OnInit {

  list$: Observable<IJob[]>;
  selectedElement: IJob = { id: 0 };
  config: Config = {
    parentTable: 'user',
    parentId: 0,
    table: 'job',
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

  onSelect(element: IJob) {
    console.log('Selected element with id ' + element.id);
    this.selectedElement = element;
  }

}
