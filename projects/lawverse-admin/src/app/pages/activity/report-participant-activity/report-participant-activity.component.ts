import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, map } from 'rxjs';
import { GetParticipantDtoDataRes } from '../../../dto/order-detail/get-participant-dto-data-res';
import { OrderDetailService } from '../../../service/order-detail.service';

@Component({
  selector: 'app-report-participant-activity',
  templateUrl: './report-participant-activity.component.html',
  styleUrls: ['./report-participant-activity.component.scss']
})
export class ReportParticipantActivityComponent implements OnInit {

  orders$: Observable<GetParticipantDtoDataRes[]>
  participants: GetParticipantDtoDataRes[] = []

  constructor(private orderDetailService: OrderDetailService, private router: Router) { }

  ngOnInit(): void {
    this.getOrder()
  }


  async getOrder(): Promise<void> {
    const result = await firstValueFrom(this.orderDetailService.getParticipant().pipe(map(result => result.data)))
    this.participants = result
  }

}
