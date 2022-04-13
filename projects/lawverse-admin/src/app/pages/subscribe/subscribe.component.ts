import { Component, OnInit } from '@angular/core';
import { firstValueFrom, map, Observable  } from 'rxjs';
import { UpdateOrderDtoReq } from '../../dto/order/update-order-dto-req';
import { GetOrderDtoDataRes } from '../../dto/order/get-order-dto-data-res';
import { OrderService } from '../../service/order.service';
import { UserService } from '../../service/user.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  subscribes$: Observable<GetOrderDtoDataRes[]>
  updateReq: UpdateOrderDtoReq = new UpdateOrderDtoReq()

  constructor(private orderService: OrderService, private userService : UserService,
    private loginService : LoginService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.subscribes$ = this.orderService.getAllPendingSubscribe().pipe(map(result => result.data))
  }

  async onApprove(id: string, userId : string, duration : number): Promise<void> {
    this.updateReq.id = id
    const result = await firstValueFrom(this.orderService.updateApprove(this.updateReq))
    if(result) {
      const user = this.loginService.getData()
      const updateUser = await firstValueFrom(this.userService.updateSubcription(userId, duration, user.id))
      if(updateUser) this.getData()
    }
  }

  async onReject(id: string): Promise<void> {
    this.updateReq.id = id
    const result = await firstValueFrom(this.orderService.updateReject(this.updateReq))
    if (result) this.getData()
  }

}
