import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetIndustryDtoDataRes } from '../../../dto/industry/get-industry-dto-data-res';
import { IndustryService } from '../../../service/industry.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.scss']
})
export class IndustryListComponent implements OnInit, OnDestroy {

  industries: GetIndustryDtoDataRes[] = []

  industrySubs?: Subscription
  deleteIndsustrySubs?: Subscription

  constructor(private router: Router, private industryService: IndustryService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.industrySubs = this.industryService.getAll().subscribe(result => {
      this.industries = result.data
    })
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/industry/new')
  }

  update(id: string) {
    this.router.navigateByUrl(`/admin/industry/${id}`)
  }

  delete(id: string): void {
    this.deleteIndsustrySubs = this.industryService.deleteById(id).subscribe(result => {
      if (result.msg) {
        this.getData()
      }
    })
  }

  ngOnDestroy(): void {
    this.industrySubs.unsubscribe()
    this.industrySubs?.unsubscribe()
  }

}
