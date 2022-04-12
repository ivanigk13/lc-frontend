import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first, firstValueFrom, map, Observable, Subscription } from 'rxjs';
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
export class ActivityAddComponent implements OnInit {

  files: File[] = []
  categories$: Observable<GetCategoryDtoDataRes[]>
  activityTypes$: Observable<GetActivityTypeDtoDataRes[]>
  insertActivityDtoReq: InsertActivityDtoReq = new InsertActivityDtoReq()

  constructor(private title: Title, private activityService: ActivityService, private router: Router,
    private categoryService: CategoryService, private activityTypeService: ActivityTypeService) {
    title.setTitle('Insert Activity')
  }
  ngOnInit(): void {
    this.getCategory()
    this.getActivityType()
  }

  getCategory(): void {
    this.categories$ = this.categoryService.getAll().pipe(map(result => result.data))
  }

  getActivityType(): void {
    this.activityTypes$ = this.activityTypeService.getAll().pipe(map(result => result.data))
  }

  async insert(valid: boolean): Promise<void> {
    if (valid) {
      const result = await firstValueFrom(this.activityService.insert(this.insertActivityDtoReq, this.files).pipe(map(result => result.data)))
      if (result) this.router.navigateByUrl('/member/event')
    }
  }

  changeFile(event: any) {
    this.files.push(event.target.files[0])
    console.log(this.files)
  }

}
