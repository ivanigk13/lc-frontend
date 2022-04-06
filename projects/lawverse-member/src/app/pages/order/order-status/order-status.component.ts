import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetOrderDetailDtoDataRes } from '../../../dto/order-detail/get-order-detail-dto-data-res';
import { LoginService } from '../../../service/login.service';
import { OrderDetailService } from '../../../service/order-detail.service';
import { GetOrderDtoDataRes } from '../../../dto/order/get-order-dto-data-res';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {

  orders : GetOrderDtoDataRes[] = []
  orderDetails : GetOrderDetailDtoDataRes[] = []
  getOrderDetailSubs! : Subscription
  getByUserIdSubs! : Subscription

  constructor(private orderService : OrderService, private orderDetailService : OrderDetailService, private loginService : LoginService ) { }


  ngOnInit(): void {
    this.getOrder()
  }

  getOrder() : void {  
    const userId : string = this.loginService.getData().id
    this.getByUserIdSubs = this.orderService.getByUserId(userId).subscribe(result => {
      this.orders = result.data    
      console.log(this.orders)
    })
  }

  ngOnDestroy(): void {
    this.getByUserIdSubs.unsubscribe()
  }

}
