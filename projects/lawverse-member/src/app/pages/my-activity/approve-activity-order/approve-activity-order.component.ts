import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { GetActivityDtoDataRes } from '../../../dto/activity/get-activity-dto-data-res';
import { ActivityService } from '../../../service/activity.service';
import { GetParticipantDtoDataRes } from '../../../dto/order-detail/get-participant-dto-data-res';
import { OrderDetailService } from '../../../service/order-detail.service';
import { OrderService } from '../../../service/order.service';
import { UpdateOrderDtoReq } from '../../../dto/order/update-order-dto-req';

@Component({
  selector: 'app-approve-activity-order',
  templateUrl: './approve-activity-order.component.html',
  styleUrls: ['./approve-activity-order.component.css']
})
export class ApproveActivityOrderComponent implements OnInit {

  orders$: Observable<GetParticipantDtoDataRes[]>
  activity: GetActivityDtoDataRes
  order: UpdateOrderDtoReq = new UpdateOrderDtoReq

  constructor(private orderDetailService: OrderDetailService, private orderService: OrderService, private activatedRoute: ActivatedRoute,
    private router: Router, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getOrder()
  }


  async getOrder(): Promise<void> {
    const id = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
    if (id) {
      this.orders$ = this.orderDetailService.getParticipantByActivityId((id as any).id).pipe(map(result => result.data))
      this.activity = await firstValueFrom(this.activityService.getById((id as any).id).pipe(map(result => result.data)))
    }
  }

  onBack(): void {
    this.router.navigateByUrl('/member/my-activity')
  }

  async onApprove(id: string): Promise<void> {
    this.order = await firstValueFrom(this.orderService.getById(id).pipe(map(result => result.data)))
    console.log(this.order)
    if (this.order) this.orderService.updateApprove(this.order)
  }


}


