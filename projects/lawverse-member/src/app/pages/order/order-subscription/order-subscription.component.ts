import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { OrderService } from '../../../service/order.service';
import { GetSubscribeDtoDataRes } from '../../../dto/subscribe/get-subscribe-dto-data-res';
import { SubscribeService } from '../../../service/subscribe.service';
import { InsertOrderDtoReq } from '../../../dto/order/insert-order-dto-req';
import { LoginService } from '../../../service/login.service';
import { OrderDetailService } from '../../../service/order-detail.service';
import { InsertOrderDetailDtoReq } from '../../../dto/order-detail/insert-order-detail-dto-req';

@Component({
  selector: 'app-order-subscription',
  templateUrl: './order-subscription.component.html',
  styleUrls: ['./order-subscription.component.scss']
})
export class OrderSubscriptionComponent implements OnInit {

  subscribe : GetSubscribeDtoDataRes
  order : InsertOrderDtoReq = new InsertOrderDtoReq()
  orderDetail : InsertOrderDetailDtoReq = new InsertOrderDetailDtoReq()
  file : File

  constructor(private router : Router, private activatedRoute : ActivatedRoute, private subscribeService: SubscribeService,
    private orderService : OrderService, private loginService : LoginService,
    private orderDetailService : OrderDetailService) { }

  ngOnInit(): void {
    this.getSubscribe()
  }

  async getSubscribe(): Promise<void> {
    const id = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
    if (id) {
      this.subscribe = await firstValueFrom(this.subscribeService.getById((id as any).id).pipe(map(result => result.data)))
      if (this.subscribe) this.orderDetail.subscribeId = this.subscribe.id
    }
  }

  async onSubmit(data: boolean): Promise<void> {
    if (data) {
      this.order.userId = this.loginService.getData().id
      const result = await firstValueFrom(this.orderService.insert(this.order, this.file).pipe(map(result => result.data)))
      if (result) {
        this.orderDetail.orderId = result.id
        const id = await firstValueFrom(this.orderDetailService.insert(this.orderDetail).pipe(map(result => result.data)))
        if (id) this.router.navigateByUrl('/member/order/status')
      }
    }
  }

  change(event : any) : void {
    this.file = event.target.files[0]
  }

}
