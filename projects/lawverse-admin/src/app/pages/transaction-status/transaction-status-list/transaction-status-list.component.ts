import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetTransactionStatusDtoDataRes } from 'src/app/dto/transaction-status/get-transaction-status-dto-data-res';
import { TransactionStatusService } from 'src/app/service/transaction-statis.service';

@Component({
  selector: 'app-transaction-status-list',
  templateUrl: './transaction-status-list.component.html',
  styleUrls: ['./transaction-status-list.component.scss']
})
export class TransactionStatusListComponent implements OnInit, OnDestroy {

  transactionStatus: GetTransactionStatusDtoDataRes[] = []

  transactionStatusSubs?: Subscription

  constructor(private transactionStatusService: TransactionStatusService) { }

  ngOnInit(): void {
    this.transactionStatusSubs = this.transactionStatusService.getAll().subscribe(result => {
      this.transactionStatus = result.data

    })
  }

  ngOnDestroy(): void {
    this.transactionStatusSubs?.unsubscribe()
  }
}
