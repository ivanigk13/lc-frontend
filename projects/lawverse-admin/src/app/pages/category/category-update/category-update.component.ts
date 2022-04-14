import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetCategoryDtoDataRes } from '../../../dto/category/get-category-dto-data-res';
import { UpdateCategoryDtoReq } from '../../../dto/category/update-category-dto-req';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {

  categoryUpdate: UpdateCategoryDtoReq = new UpdateCategoryDtoReq()
  category: GetCategoryDtoDataRes = new GetCategoryDtoDataRes()

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private categoryService: CategoryService) {
    this.title.setTitle('Lawverse: Update - Category')
  }

  ngOnInit(): void {
    this.startInit()
  }

  async startInit() : Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params)
    const id : string = (result as any).id
    const resultCategory = await firstValueFrom(this.categoryService.getById(id))
    this.category = resultCategory.data
  }

  async update(valid: boolean): Promise<void> {
    if (valid) {
      this.categoryUpdate.categoryName = this.category.categoryName
      const result = await firstValueFrom(this.categoryService.update(this.category))
      if(result){
        this.router.navigateByUrl('/admin/category/list')
      }
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/category/list')
  }

}
