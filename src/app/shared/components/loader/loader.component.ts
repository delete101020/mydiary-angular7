import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderService } from '../../services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading: Subject<boolean>;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.isLoading = this.loaderService.isLoading;
  }

}
