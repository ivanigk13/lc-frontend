import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetPositionDtoDataRes } from '../../../dto/position/get-position-dto-data-res';
import { UpdatePositionDtoReq } from '../../../dto/position/update-position-dto-req';
import { PositionService } from '../../../service/position.service';

@Component({
  selector: 'app-position-update',
  templateUrl: './position-update.component.html',
  styleUrls: ['./position-update.component.scss']
})
export class PositionUpdateComponent implements OnInit {

  positionUpdate: UpdatePositionDtoReq = new UpdatePositionDtoReq()
  position: GetPositionDtoDataRes = new GetPositionDtoDataRes()

  activatedRouteSubs?: Subscription
  positionSubs?: Subscription
  updatePositionSubs?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private positionService: PositionService) {
    this.title.setTitle('Lawverse: Update - Position')
  }

  ngOnInit(): void {
    this.activatedRouteSubs = this.activatedRoute.params.subscribe(result => {
      const id: string = (result as any).id
      this.positionSubs = this.positionService.getById(id).subscribe(result => {
        this.position = result.data
      })
    })
  }

  update(valid: boolean): void {
    if (valid) {
      this.positionUpdate.positionName = this.position.positionName
      this.updatePositionSubs = this.positionService.update(this.position).subscribe(result => {
        this.router.navigateByUrl('/admin/position/list')
      })
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/position/list')
  }

  ngOnDestroy(): void {
    this.activatedRouteSubs?.unsubscribe()
    this.positionSubs?.unsubscribe()
    this.updatePositionSubs?.unsubscribe()
  }

}
