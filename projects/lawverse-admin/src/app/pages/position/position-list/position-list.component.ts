import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetPositionDtoDataRes } from '../../../dto/position/get-position-dto-data-res';
import { PositionService } from '../../../service/position.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit, OnDestroy {

  positions: GetPositionDtoDataRes[] = []

  positionSubs?: Subscription
  deletePositionSubs?: Subscription

  constructor(private router: Router, private positionService: PositionService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.positionSubs = this.positionService.getAll().subscribe(result => {
      this.positions = result.data
    })
  }

  update(id: string) {
    this.router.navigateByUrl(`/admin/position/${id}`)
  }

  delete(id: string): void {
    this.deletePositionSubs = this.positionService.delete(id).subscribe(result => {
      if (result.msg) {
        this.getData()
      }
    })
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/position/new')
  }

  ngOnDestroy(): void {
    this.positionSubs.unsubscribe()
    this.deletePositionSubs?.unsubscribe()
  }
}
