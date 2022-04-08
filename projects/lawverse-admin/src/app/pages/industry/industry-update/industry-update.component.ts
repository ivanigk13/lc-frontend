import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetIndustryDtoDataRes } from '../../../dto/industry/get-industry-dto-data-res';
import { UpdateIndustryDtoReq } from '../../../dto/industry/update-industry-dto-req';
import { IndustryService } from '../../../service/industry.service';

@Component({
  selector: 'app-industry-update',
  templateUrl: './industry-update.component.html',
  styleUrls: ['./industry-update.component.scss']
})
export class IndustryUpdateComponent implements OnInit {

  industryUpdate: UpdateIndustryDtoReq = new UpdateIndustryDtoReq()
  industry: GetIndustryDtoDataRes = new GetIndustryDtoDataRes()

  activatedRouteSubs?: Subscription
  industrySubs?: Subscription
  updateIndustrySubs?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private industryService: IndustryService) {
    this.title.setTitle('Lawverse: Update - Industry')
  }

  ngOnInit(): void {
    this.activatedRouteSubs = this.activatedRoute.params.subscribe(result => {
      const id: string = (result as any).id
      this.industrySubs = this.industryService.getById(id).subscribe(result => {
        this.industry = result.data
      })
    })
  }

  update(valid: boolean): void {
    if (valid) {
      this.industryUpdate.industryName = this.industry.industryName
      this.updateIndustrySubs = this.industryService.update(this.industry).subscribe(result => {
        this.router.navigateByUrl('/admin/industry/list')
      })
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/industry/list')
  }

  ngOnDestroy(): void {
    this.activatedRouteSubs?.unsubscribe()
    this.industrySubs?.unsubscribe()
    this.updateIndustrySubs?.unsubscribe()
  }

}
