import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-subscription',
  templateUrl: './order-subscription.component.html',
  styleUrls: ['./order-subscription.component.scss']
})
export class OrderSubscriptionComponent implements OnInit {

  file : File

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(data : boolean) :void {
    if(data){

    }
  }

  change(event : any) : void {
    this.file = event.target.files[0]
  }


}
