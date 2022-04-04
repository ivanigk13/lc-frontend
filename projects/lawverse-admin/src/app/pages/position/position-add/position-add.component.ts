import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetPositionDtoDataRes } from 'src/app/dto/position/get-position-dto-data-res';
import { InsertPositionDtoReq } from 'src/app/dto/position/insert-position-dto-req';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-add',
  templateUrl: './position-add.component.html',
  styleUrls: ['./position-add.component.scss']
})
export class PositionAddComponent implements OnInit, OnDestroy {

  position: InsertPositionDtoReq = new InsertPositionDtoReq()

  positionSubs?: Subscription

  constructor(private router: Router, private positionService: PositionService) { }

  ngOnInit(): void {
  }

  onSubmit(valid: boolean): void {
    if (valid) {
      this.positionSubs = this.positionService.insert(this.position).subscribe(result => {
        this.router.navigateByUrl('/dashboard/position/list')
      })
    }
  }

  back(): void {
    this.router.navigateByUrl('/dashboard/position/list')
  }

  ngOnDestroy(): void {
    this.positionSubs?.unsubscribe()
  }

}
