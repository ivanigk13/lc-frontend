import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertActivityDtoReq } from 'src/app/dto/activity/insert-activity-dto-req';
import { GetCategoryDtoDataRes } from 'src/app/dto/category/get-category-dto-data-res';
import { ActivityTypeService } from 'src/app/service/activity-type.service';
import { ActivityService } from 'src/app/service/activity.service';
import { CategoryService } from 'src/app/service/category.service';
import { GetActivityTypeDtoDataRes } from '../../../dto/activity-type/get-activity-type-dto-data-res';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityAddComponent implements OnInit,OnDestroy {

  insertSubs? : Subscription
  getCategorySubs? : Subscription
  getActivityTypeSubs? : Subscription
  files : File[] = []
  categories : GetCategoryDtoDataRes[] = []
  activityTypes: GetActivityTypeDtoDataRes[] = []
  insertActivityDtoReq : InsertActivityDtoReq = new InsertActivityDtoReq()

  constructor(private title:Title, private activityService:ActivityService, private router:Router,
              private categoryService:CategoryService, private activityTypeService:ActivityTypeService) {
    title.setTitle('Insert Activity')
  }
  ngOnInit(): void {
    this.getCategorySubs = this.categoryService.getAll().subscribe(result=>{
      this.categories = result.data
    })
    this.getActivityTypeSubs = this.activityTypeService.getAll().subscribe(result=>{
      this.activityTypes = result.data
    })
  }

  insert(valid:boolean) {
    if(valid){
      this.insertSubs = this.activityService.insert(this.insertActivityDtoReq, this.files).subscribe(result=>{
        if(result.data.id) this.router.navigateByUrl('/activity')
      })
    }
  }

  changeFile(event : any) {
    this.files.push(event.target.files[0])
    console.log(this.files)
  }  

  ngOnDestroy(): void {
    this.insertSubs?.unsubscribe()
  }

}
