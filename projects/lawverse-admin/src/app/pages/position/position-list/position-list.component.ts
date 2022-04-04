import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetPositionDtoDataRes } from 'src/app/dto/position/get-position-dto-data-res';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit, OnDestroy {

  positions: GetPositionDtoDataRes[] = []

  positionSubs?: Subscription

  constructor(private router: Router, private positionService: PositionService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.positionSubs = this.positionService.getAll().subscribe(result => {
      this.positions = result.data
    })
  }

  onClick(): void {
    this.router.navigateByUrl('/dashboard/position/new')
  }

  ngOnDestroy(): void {
    this.positionSubs.unsubscribe()
  }
}
