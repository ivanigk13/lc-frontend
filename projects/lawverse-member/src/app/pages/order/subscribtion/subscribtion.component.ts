import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetSubscribeDtoDataRes } from '../../../dto/subscribe/get-subscribe-dto-data-res';
import { SubscribeService } from '../../../service/subscribe.service';

@Component({
  selector: 'app-subscribtion',
  templateUrl: './subscribtion.component.html',
  styleUrls: ['./subscribtion.component.scss']
})
export class SubscribtionComponent implements OnInit, OnDestroy{

  subscribes : GetSubscribeDtoDataRes[] = []
  getAllSubs! : Subscription

  constructor(private router: Router, private subscribeService : SubscribeService) { }
 

  ngOnInit(): void {
    this.getAll()
  }

  getAll() : void {
    this.getAllSubs = this.subscribeService.getAll().subscribe(result => this.subscribes = result.data)
  }

  onSelect(id : string) : void {
    this.router.navigateByUrl(`/member/order/order-subscription/${id}`)
  }

  ngOnDestroy(): void {
    this.getAllSubs.unsubscribe()
  }

}
