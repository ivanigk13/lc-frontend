import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InsertPositionDtoReq } from '../../../dto/position/insert-position-dto-req';
import { PositionService } from '../../../service/position.service';

@Component({
  selector: 'app-position-add',
  templateUrl: './position-add.component.html',
  styleUrls: ['./position-add.component.scss']
})
export class PositionAddComponent implements OnInit {

  position: InsertPositionDtoReq = new InsertPositionDtoReq()

  constructor(private router: Router, private positionService: PositionService) { }

  ngOnInit(): void {
  }

  async onSubmit(valid: boolean): Promise<void> {
    if (valid) {
      const result = await firstValueFrom(this.positionService.insert(this.position))
      if(result){
        this.router.navigateByUrl('/admin/position/list')
      }
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/position/list')
  }

}
