import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private industryService: IndustryService) {
    this.title.setTitle('Lawverse: Update - Industry')
  }

  ngOnInit(): void {
    this.startInit()
  }

  async startInit() : Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params)
    const id: string = (result as any).id
    const resultIndustry = await firstValueFrom(this.industryService.getById(id))
    this.industry = resultIndustry.data
  }

  async update(valid: boolean): Promise<void> {
    if (valid) {
      this.industryUpdate.industryName = this.industry.industryName
      const result = await firstValueFrom(this.industryService.update(this.industry))
      if(result){
        this.router.navigateByUrl('/admin/industry/list')
      }
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/industry/list')
  }

}
