import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InsertIndustryDtoReq } from '../../../dto/industry/insert-industry-dto-req';
import { IndustryService } from '../../../service/industry.service';

@Component({
  selector: 'app-industry-add',
  templateUrl: './industry-add.component.html',
  styleUrls: ['./industry-add.component.scss']
})
export class IndustryAddComponent implements OnInit {

  industry: InsertIndustryDtoReq = new InsertIndustryDtoReq()

  constructor(private router: Router, private industryService: IndustryService) { }

  ngOnInit(): void {
  }

  async onSubmit(valid: boolean): Promise<void> {
    if (valid) {
      const result = await firstValueFrom(this.industryService.insert(this.industry)) 
      if(result){
        this.router.navigateByUrl('/admin/industry/list')
      }
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/industry/list')
  }

}
