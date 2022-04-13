import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { GetPositionDtoDataRes } from '../../../dto/position/get-position-dto-data-res';
import { PositionService } from '../../../service/position.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent {

  dataPerPage = 1
  record = 0
  positions$: Observable<GetPositionDtoDataRes[]>
  positions : GetPositionDtoDataRes[] = []

  constructor(private title:Title,private router: Router, private positionService: PositionService) {
    title.setTitle('Position List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(start:number = 0, max:number = this.dataPerPage, query?:string) {
    const result = await firstValueFrom(this.positionService.getAll(start,max,query))
    this.positions = result.data
    this.record = result.rows
  }

  update(id: string): void {
    this.router.navigateByUrl(`/admin/position/${id}`)
  }

  async delete(id: string): Promise<void> {
    const result = await firstValueFrom(this.positionService.delete(id))
    if (result) this.getData(0,this.dataPerPage)
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/position/new')
  }
}
