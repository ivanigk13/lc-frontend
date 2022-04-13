import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, Observable } from 'rxjs';
import { GetTransactionStatusDtoDataRes } from '../../../dto/transaction-status/get-transaction-status-dto-data-res';
import { TransactionStatusService } from '../../../service/transaction-statis.service';

@Component({
  selector: 'app-transaction-status-list',
  templateUrl: './transaction-status-list.component.html',
  styleUrls: ['./transaction-status-list.component.scss']
})
export class TransactionStatusListComponent {

  dataPerPage = 2
  record = 0
  transactionStatus$: Observable<GetTransactionStatusDtoDataRes[]>
  transactionStatus : GetTransactionStatusDtoDataRes[] = []

  constructor(private title:Title,private router:Router,private transactionStatusService: TransactionStatusService) {
    title.setTitle('Transaction Status List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(start:number = 0, max:number = this.dataPerPage, query?:string) {
    const result = await firstValueFrom(this.transactionStatusService.getAll(start,max,query))
    this.transactionStatus = result.data
    this.record = result.rows
  }

}
