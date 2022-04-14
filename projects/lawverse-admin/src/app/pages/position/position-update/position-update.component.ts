import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
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

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private positionService: PositionService) {
    this.title.setTitle('Lawverse: Update - Position')
  }

  ngOnInit(): void {
    this.startInit()
  }

  async startInit() {
    const result = await firstValueFrom(this.activatedRoute.params)
    const id: string = (result as any).id
    const resultPosition = await firstValueFrom(this.positionService.getById(id))
    this.position = resultPosition.data
  }

  async update(valid: boolean): Promise<void> {
    if (valid) {
      this.positionUpdate.positionName = this.position.positionName
      const result = await firstValueFrom(this.positionService.update(this.position))
      if(result){
        this.router.navigateByUrl('/admin/position/list')
      }
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/position/list')
  }

}
