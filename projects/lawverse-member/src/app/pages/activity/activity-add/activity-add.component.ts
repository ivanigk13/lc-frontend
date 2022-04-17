import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first, firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { InsertActivityDtoReq } from '../../../dto/activity/insert-activity-dto-req';
import { GetCategoryDtoDataRes } from '../../../dto/category/get-category-dto-data-res';
import { ActivityTypeService } from '../../../service/activity-type.service';
import { ActivityService } from '../../../service/activity.service';
import { CategoryService } from '../../../service/category.service';
import { GetActivityTypeDtoDataRes } from '../../../dto/activity-type/get-activity-type-dto-data-res';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrls: ['./activity-add.component.scss']
})
export class ActivityAddComponent implements OnInit {

  files: File[] = []
  categories$: Observable<GetCategoryDtoDataRes[]>
  activityTypes: GetActivityTypeDtoDataRes[] = []
  price : number
  insertActivityDtoReq: InsertActivityDtoReq = new InsertActivityDtoReq()
  isLoading: boolean = false

  constructor(private title: Title, private activityService: ActivityService, private router: Router,
    private categoryService: CategoryService, private activityTypeService: ActivityTypeService) {
    title.setTitle('Insert Activity')
  }
  ngOnInit(): void {
    this.getCategory()
    this.getActivityType()
  }

  async change(id : string) : Promise<void> {
      this.price = await firstValueFrom(this.activityTypeService.getById(id).pipe(map(result => result.data.price)))
  } 

  getCategory(): void {
    this.categories$ = this.categoryService.getAll().pipe(map(result => result.data))
  }



  async getActivityType(): Promise<void> {
    this.activityTypes = await firstValueFrom(this.activityTypeService.getAll().pipe(map(result => result.data)))
  }

  async insert(valid: boolean): Promise<void> {
    if (valid) {
      this.isLoading = true
      const result = await firstValueFrom(this.activityService.insert(this.insertActivityDtoReq, this.files).pipe(map(result => result.data)))
      if (result) {        
        this.router.navigateByUrl('/member/activity/event')
      }
    }
  }

  changeFile(event: any) {
    this.files.push(event.target.files[0])   
  }

}
