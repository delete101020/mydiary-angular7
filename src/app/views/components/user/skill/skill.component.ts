import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Config, ISkill } from '../../../../shared/models';
import { DataService } from '../../../../shared/services';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: []
})
export class SkillComponent implements OnInit {

  list$: Observable<ISkill[]>;
  selectedElement: ISkill = { id: 0 };
  config: Config = {
    parentTable: 'user',
    parentId: 0,
    table: 'skill',
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

  onSelect(element: ISkill) {
    console.log('Selected element with id ' + element.id);
    this.selectedElement = element;
  }


}
