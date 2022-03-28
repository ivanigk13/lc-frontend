import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-status-list',
  templateUrl: './transaction-status-list.component.html',
  styleUrls: ['./transaction-status-list.component.scss']
})
export class TransactionStatusListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  statuses = [
    { name: 'Approved', code: 'APR' },
    { name: 'Pending', code: 'PND' },
    { name: 'Rejected', code: 'RJC' }
  ]
}
