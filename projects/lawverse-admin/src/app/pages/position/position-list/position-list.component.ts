import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { GetPositionDtoDataRes } from '../../../dto/position/get-position-dto-data-res';
import { PositionService } from '../../../service/position.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent implements OnInit {

  positions$: Observable<GetPositionDtoDataRes[]>

  constructor(private router: Router, private positionService: PositionService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.positions$ = this.positionService.getAll().pipe(map(result => result.data))
  }

  update(id: string): void {
    this.router.navigateByUrl(`/admin/position/${id}`)
  }

  async delete(id: string): Promise<void> {
    const result = await firstValueFrom(this.positionService.delete(id))
    if (result) this.getData()
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/position/new')
  }
}
