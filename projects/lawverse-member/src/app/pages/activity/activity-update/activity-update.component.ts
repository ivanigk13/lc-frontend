import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';
import { GetActivityDtoDataRes } from 'src/app/dto/activity/get-activity-dto-data-res';
import { GetActivityTypeDtoDataRes } from '../../../dto/activity-type/get-activity-type-dto-data-res';
import { UpdateActivityDtoReq } from '../../../dto/activity/update-activity-dto-req';
import { GetCategoryDtoDataRes } from '../../../dto/category/get-category-dto-data-res';
import { ActivityTypeService } from '../../../service/activity-type.service';
import { ActivityService } from '../../../service/activity.service';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.css']
})
export class ActivityUpdateComponent implements OnInit {

  files: File[] = []
  price: number
  updateActivityDtoReq: UpdateActivityDtoReq = new UpdateActivityDtoReq()
  activity : GetActivityDtoDataRes
  isLoading : boolean = false

  constructor(private title: Title, private activityService: ActivityService, private router: Router,
    private activatedRoute : ActivatedRoute, private activityTypeService: ActivityTypeService) {
    this.title.setTitle('Insert Activity')
  }
  ngOnInit(): void {
       this.getActivity()
  }

  async getActivity() : Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params)
    const id = (result as any).id
    const activityData = await firstValueFrom(this.activityService.getById(id))
    if (activityData) {
      this.updateActivityDtoReq.activityName = activityData.data.activityName
      this.updateActivityDtoReq.dateEnd = activityData.data.dateEnd
      this.updateActivityDtoReq.dateStart = activityData.data.dateStart
      this.updateActivityDtoReq.fileId = activityData.data.fileId
      this.updateActivityDtoReq.id = activityData.data.id
      this.updateActivityDtoReq.location = activityData.data.location
      this.updateActivityDtoReq.paymentFileId = activityData.data.paymentFileId
      this.updateActivityDtoReq.price = activityData.data.price
      this.updateActivityDtoReq.timeEnd = activityData.data.timeEnd
      this.updateActivityDtoReq.timeStart = activityData.data.timeStart
      this.updateActivityDtoReq.version = activityData.data.version
      console.log(this.updateActivityDtoReq)
    }
  }

  async change(id: string): Promise<void> {
    this.price = await firstValueFrom(this.activityTypeService.getById(id).pipe(map(result => result.data.price)))
  }

  async update(valid: boolean): Promise<void> {
    if (valid) {
      this.isLoading = true
      const result = await firstValueFrom(this.activityService.update(this.updateActivityDtoReq, this.files).pipe(map(result => result.data)))
      if (result) {        
        this.router.navigateByUrl('/member/thread')
      }
    }
  }

  changeFile(event: any) {
    this.files.push(event.target.files[0])
  }

  onBack() : void {
    this.router.navigateByUrl('/member/my-activity')
  }


}
