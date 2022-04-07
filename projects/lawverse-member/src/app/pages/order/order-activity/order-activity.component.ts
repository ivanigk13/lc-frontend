import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertOrderDetailDtoReq } from '../../../dto/order-detail/insert-order-detail-dto-req';
import { InsertOrderDtoReq } from '../../../dto/order/insert-order-dto-req';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';
import { LoginService } from '../../../service/login.service';
import { OrderDetailService } from '../../../service/order-detail.service';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-order-activity',
  templateUrl: './order-activity.component.html',
  styleUrls: ['./order-activity.component.scss']
})
export class OrderActivityComponent implements OnInit, OnDestroy {

  activity: GetActivityDtoDataRes
  order: InsertOrderDtoReq = new InsertOrderDtoReq()
  orderDetail: InsertOrderDetailDtoReq = new InsertOrderDetailDtoReq()
  orderSubs!: Subscription
  orderDetailSubs!: Subscription
  activeRouteSubs: Subscription
  getByIdSubs!: Subscription
  file!: File

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private activityService: ActivityService, private loginService: LoginService,
    private orderDetailService: OrderDetailService, private orderService: OrderService) { }


  ngOnInit(): void {
    this.activeRouteSubs = this.activatedRoute.params.subscribe(result => {
      this.getByIdSubs = this.activityService.getById((result as any).id).subscribe(result => {
        this.activity = result.data
        this.orderDetail.activityId = result.data.id
      })
    })
  }

  onSubmit(data: boolean): void {
    if (data) {
      this.order.userId = this.loginService.getData().id
      this.orderSubs = this.orderService.insert(this.order, this.file).subscribe(result => {
        if (result) {
          console.log(result.data.id)
          this.orderDetail.orderId = result.data.id
          console.log(this.orderDetail)
          this.orderDetailSubs = this.orderDetailService.insert(this.orderDetail).subscribe(result => {
            if (result) {
              this.router.navigateByUrl('/member/order/status')
            }
          })
        }
      })
    }
  }

  change(event: any): void {
    this.file = event.target.files[0]
  }

  ngOnDestroy(): void {

  }
}
