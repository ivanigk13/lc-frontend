import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertIndustryDtoReq } from 'src/app/dto/industry/insert-industry-dto-req';
import { IndustryService } from 'src/app/service/industry.service';

@Component({
  selector: 'app-industry-add',
  templateUrl: './industry-add.component.html',
  styleUrls: ['./industry-add.component.scss']
})
export class IndustryAddComponent implements OnInit, OnDestroy {

  industry: InsertIndustryDtoReq = new InsertIndustryDtoReq()

  industrySubs?: Subscription

  constructor(private router: Router, private industryService: IndustryService) { }

  ngOnInit(): void {
  }

  onSubmit(valid: boolean): void {
    if (valid) {
      this.industrySubs = this.industryService.insert(this.industry).subscribe(result => {
        this.router.navigateByUrl('/admin/industry/list')
      })
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/industry/list')
  }

  ngOnDestroy(): void {
    this.industrySubs?.unsubscribe()
  }
}
