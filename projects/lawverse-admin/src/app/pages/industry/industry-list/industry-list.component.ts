import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { GetIndustryDtoDataRes } from '../../../dto/industry/get-industry-dto-data-res';
import { IndustryService } from '../../../service/industry.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.scss']
})
export class IndustryListComponent implements OnInit {

  
  industries$: Observable<GetIndustryDtoDataRes[]>

  constructor(private router: Router, private industryService: IndustryService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.industries$ = this.industryService.getAll().pipe(map(result => result.data))
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/industry/new')
  }

  update(id: string) {
    this.router.navigateByUrl(`/admin/industry/${id}`)
  }

  async delete(id: string): Promise<void> {
    const result = await firstValueFrom(this.industryService.deleteById(id))
    if (result) this.getData()
  }

}
