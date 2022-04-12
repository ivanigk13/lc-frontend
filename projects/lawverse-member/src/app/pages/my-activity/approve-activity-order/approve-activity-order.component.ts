import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { GetOrderDtoDataRes } from '../../../dto/order/get-order-dto-data-res';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-approve-activity-order',
  templateUrl: './approve-activity-order.component.html',
  styleUrls: ['./approve-activity-order.component.css']
})
export class ApproveActivityOrderComponent implements OnInit {
  
  orders$: Observable<GetOrderDtoDataRes[]>  

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
   this.getOrder()
  }


  async getOrder(): Promise<void> {
    const id = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
    if (id) {
      this.orders$ = this.orderService.getPendingOrderByActivityId((id as any).id).pipe(map(result => result.data))      
    }
  }

  onBack() : void {
    this.router.navigateByUrl('/member/my-activity')
  }

  async onApprove(id: string): Promise<void> {
     const result = await firstValueFrom(this.orderService.getById(id).pipe(map(result => result.data)))      
      if(result) this.orderService.updateApprove(result)    
  }


}


