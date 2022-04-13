import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, Observable } from 'rxjs';
import { GetIndustryDtoDataRes } from '../../../dto/industry/get-industry-dto-data-res';
import { IndustryService } from '../../../service/industry.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.scss']
})
export class IndustryListComponent {

  dataPerPage : number = 3
  record : number = 0
  industries$: Observable<GetIndustryDtoDataRes[]>
  industries : GetIndustryDtoDataRes[] = []

  constructor(private title:Title,private router: Router, private industryService: IndustryService) {
    title.setTitle('Industry List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(start:number = 0, max:number = this.dataPerPage, query?:string) {
    const result = await firstValueFrom(this.industryService.getAll(start,max,query))
    this.industries = result.data
    this.record = result.rows
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/industry/new')
  }

  update(id: string) {
    this.router.navigateByUrl(`/admin/industry/${id}`)
  }

  async delete(id: string): Promise<void> {
    const result = await firstValueFrom(this.industryService.deleteById(id))
    if (result) this.getData(0,this.dataPerPage)
  }

}
