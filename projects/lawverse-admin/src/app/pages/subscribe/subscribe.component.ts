import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UpdateOrderDtoReq } from '../../dto/order/update-order-dto-req';
import { GetOrderDtoDataRes } from '../../dto/order/get-order-dto-data-res';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit, OnDestroy {

  subscribes: GetOrderDtoDataRes[] = []
  updateReq: UpdateOrderDtoReq = new UpdateOrderDtoReq()

  subscribeSubs?: Subscription
  updateApproveSubs?: Subscription
  updateRejectSubs?: Subscription

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.subscribeSubs = this.orderService.getAllPendingSubscribe().subscribe(result => {
      this.subscribes = result.data
    })
  }

  onApprove(id: string): void {
    this.updateReq.id = id
    this.updateApproveSubs = this.orderService.updateApprove(this.updateReq).subscribe(result => {
      this.getData()
    })
  }

  onReject(id: string): void {
    this.updateReq.id = id
    this.updateRejectSubs = this.orderService.updateReject(this.updateReq).subscribe(result => {
      this.getData()
    })
  }

  ngOnDestroy(): void {
    this.subscribeSubs.unsubscribe()
    this.updateApproveSubs.unsubscribe()
    this.updateRejectSubs.unsubscribe()
  }

}
