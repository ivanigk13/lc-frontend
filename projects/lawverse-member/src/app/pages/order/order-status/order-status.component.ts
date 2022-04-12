import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginService } from '../../../service/login.service';
import { OrderDetailService } from '../../../service/order-detail.service';
import { GetOrderDtoDataRes } from '../../../dto/order/get-order-dto-data-res';
import { OrderService } from '../../../service/order.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit{

  orders$: Observable<GetOrderDtoDataRes[]>  

  constructor(private title : Title, private orderService : OrderService, private orderDetailService : OrderDetailService, private loginService : LoginService ) {
    this.title.setTitle('Order Status')
   }


  ngOnInit(): void {
    this.getOrder()
  }

  async getOrder() : Promise<void> {  
    const userId : string = this.loginService.getData().id
    this.orders$ = await this.orderService.getByUserId(userId).pipe(map(result => result.data))
  }

}
