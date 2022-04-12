import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Subscription } from 'rxjs';
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
export class OrderActivityComponent implements OnInit {

  activity: GetActivityDtoDataRes
  order: InsertOrderDtoReq = new InsertOrderDtoReq()
  orderDetail: InsertOrderDetailDtoReq = new InsertOrderDetailDtoReq()
  file!: File

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private activityService: ActivityService, private loginService: LoginService,
    private orderDetailService: OrderDetailService, private orderService: OrderService) { }


  ngOnInit(): void {
    this.getActivity()
  }

  async getActivity(): Promise<void> {
    const id = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
    if (id) {
      this.activity = await firstValueFrom(this.activityService.getById((id as any).id).pipe(map(result => result.data)))
      if (this.activity) this.orderDetail.activityId = this.activity.id
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

  change(event: any): void {
    this.file = event.target.files[0]
  }
}
