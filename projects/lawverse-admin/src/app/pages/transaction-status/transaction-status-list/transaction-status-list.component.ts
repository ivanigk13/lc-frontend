import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { GetTransactionStatusDtoDataRes } from 'src/app/dto/transaction-status/get-transaction-status-dto-data-res';
import { TransactionStatusService } from 'src/app/service/transaction-statis.service';

@Component({
  selector: 'app-transaction-status-list',
  templateUrl: './transaction-status-list.component.html',
  styleUrls: ['./transaction-status-list.component.scss']
})
export class TransactionStatusListComponent implements OnInit {

  transactionStatus$: Observable<GetTransactionStatusDtoDataRes[]>

  constructor(private transactionStatusService: TransactionStatusService) { }

  ngOnInit(): void {
    this.transactionStatus$ = this.transactionStatusService.getAll().pipe(map(result => result.data))
  }
}
