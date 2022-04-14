import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, map } from 'rxjs';
import { OrderDetailService } from '../../../service/order-detail.service';
import { GetIncomeActivityDtoDataRes } from '../../../dto/order-detail/get-income-dto-data-res';

@Component({
  selector: 'app-report-income-activity',
  templateUrl: './report-income-activity.component.html',
  styleUrls: ['./report-income-activity.component.scss']
})

export class ReportIncomeActivityComponent {

  orders$: Observable<GetIncomeActivityDtoDataRes[]>
  income: GetIncomeActivityDtoDataRes[] = []

  constructor(private orderDetailService: OrderDetailService, private router: Router) { }

  ngOnInit(): void {
    this.getOrder()
  }


  async getOrder(): Promise<void> {
    const result = await firstValueFrom(this.orderDetailService.getIncome().pipe(map(result => result.data)))
    this.income = result
  }
}
