import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionStatusService } from 'src/app/service/transaction-statis.service';
import { GetOrderDtoDataRes } from '../../../dto/order/get-order-dto-data-res';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-approve-activity-order',
  templateUrl: './approve-activity-order.component.html',
  styleUrls: ['./approve-activity-order.component.css']
})
export class ApproveActivityOrderComponent implements OnInit {


  order: GetOrderDtoDataRes
  orders: GetOrderDtoDataRes[] = []
  getOrderSubs!: Subscription
  activatedRouteSubs!: Subscription
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute,
    private transtactionStatusService: TransactionStatusService) { }

  ngOnInit(): void {
    this.activatedRouteSubs = this.activatedRoute.params.subscribe(result => {
      this.getOrderSubs = this.orderService.getPendingOrderByActivityId((result as any).id).subscribe(result => {
        this.orders = result.data
        console.log(this.orders)
      })
    })
  }

  onApprove(id: string): void {
    this.orderService.getById(id).subscribe(result => {
      this.order = result.data
      this.orderService.updateApprove(this.order).subscribe()
    })
  }
}


