import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { GetSubscribeDtoDataRes } from '../../../dto/subscribe/get-subscribe-dto-data-res';
import { SubscribeService } from '../../../service/subscribe.service';

@Component({
  selector: 'app-subscribtion',
  templateUrl: './subscribtion.component.html',
  styleUrls: ['./subscribtion.component.scss']
})
export class SubscribtionComponent implements OnInit{

  subscribes$ : Observable<GetSubscribeDtoDataRes[]>  

  constructor(private router: Router, private subscribeService : SubscribeService) { }
 

  ngOnInit(): void {
    this.getAll()
  }

  getAll() : void {
    this.subscribes$ = this.subscribeService.getAll().pipe(map(result => result.data))
  }

  onSelect(id : string) : void {
    this.router.navigateByUrl(`/member/order/order-subscription/${id}`)
  }

}
