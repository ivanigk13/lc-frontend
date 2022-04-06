import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class OrderSubscriptionComponent implements OnInit, OnDestroy {

  subscribe : GetSubscribeDtoDataRes
  order : InsertOrderDtoReq = new InsertOrderDtoReq()
  orderDetail : InsertOrderDetailDtoReq = new InsertOrderDetailDtoReq()
  orderSubs! : Subscription
  orderDetailSubs!: Subscription
  activeRouteSubs : Subscription
  getByIdSubs!: Subscription
  file : File

  constructor(private router : Router, private activatedRoute : ActivatedRoute, private subscribeService: SubscribeService,
    private orderService : OrderService, private loginService : LoginService,
    private orderDetailService : OrderDetailService) { }

  ngOnInit(): void {
    this.activeRouteSubs = this.activatedRoute.params.subscribe(result => {
      this.getByIdSubs = this.subscribeService.getById((result as any).id).subscribe(result => {
        this.subscribe = result.data
        this.orderDetail.subscribeId = result.data.id
      })
    })
  }

  onSubmit(data : boolean) :void {
    if(data){
      this.order.userId = this.loginService.getData().id      
      this.orderSubs = this.orderService.insert(this.order, this.file).subscribe(result => {
        if(result){
          console.log(result.data.id)
          this.orderDetail.orderId = result.data.id
          console.log(this.orderDetail)
          this.orderDetailSubs = this.orderDetailService.insert(this.orderDetail).subscribe(result => 
            {
              if(result){
                this.router.navigateByUrl('/member/order/status')
              }
            })
        }
      })
    }
  }

  change(event : any) : void {
    this.file = event.target.files[0]
  }

  ngOnDestroy(): void {
    this.activeRouteSubs.unsubscribe()
    this.getByIdSubs.unsubscribe()
    this.orderSubs.unsubscribe()
    this.orderDetailSubs.unsubscribe()

  }

}
