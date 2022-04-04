import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetActivityTypeDtoDataRes } from 'src/app/dto/activity-type/get-activity-type-dto-data-res';
import { InsertActivityDtoReq } from 'src/app/dto/activity/insert-activity-dto-req';
import { GetCategoryDtoDataRes } from 'src/app/dto/category/get-category-dto-data-res';
import { ActivityTypeService } from 'src/app/service/activity-type.service';
import { ActivityService } from 'src/app/service/activity.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityAddComponent implements OnInit, OnDestroy {

  activity : InsertActivityDtoReq = new InsertActivityDtoReq()
  activitySubs !: Subscription
  activityTypes : GetActivityTypeDtoDataRes[] = []
  activityTypeSubs !: Subscription
  categories : GetCategoryDtoDataRes[] = []
  categorySubs !: Subscription
  activityPicture : File
  paymentPicture : File
  files : File[] = []


  constructor(private title : Title, private router: Router, private activityService : ActivityService,
    private activityTypeService : ActivityTypeService, private categoryService : CategoryService) {
    this.title.setTitle('Insert Activity')
  }

  ngOnInit(): void {
    this.getActivityType()
    this.getCategory()
  } 

  getActivityType() : void {
    this.activityTypeSubs = this.activityTypeService.getAll().subscribe( result => this.activityTypes = result.data)
  }

  getCategory() : void {
    this.categorySubs = this.categoryService.getAll().subscribe( result => this.categories = result.data)
  }

  onSubmit(data : boolean) : void {
    if(data){
      if (this.activityPicture != null && this.paymentPicture != null) {
        this.files.push(this.activityPicture)
        this.files.push(this.paymentPicture)
      }
      this.activitySubs = this.activityService.insert(this.activity,this.files).subscribe(result => {
        if(result.data.id){
          this.router.navigateByUrl('/activity')
        }
      })
    }
  }

  picture(event : any) : void {
    this.activityPicture = event.target.files[0]
    console.log(this.files)
  }

  payment(event : any) : void {
    this.paymentPicture = event.target.files[0]
    console.log(this.files)
  }

  ngOnDestroy(): void {
    this.activityTypeSubs.unsubscribe()
    this.categorySubs.unsubscribe()
  }

  

}
