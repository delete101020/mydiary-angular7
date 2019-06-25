import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './finance/finance.component';
import { FinanceDetailComponent } from './finance-detail/finance-detail.component';

@NgModule({
  declarations: [FinanceComponent, FinanceDetailComponent],
  imports: [
    CommonModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
