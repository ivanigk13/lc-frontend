import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  activatedRouteSubs?: Subscription
  categorySubs?: Subscription
  updateCategorySubs?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private categoryService: CategoryService) {
    this.title.setTitle('Lawverse: Update - Category')
  }

  ngOnInit(): void {
    this.activatedRouteSubs = this.activatedRoute.params.subscribe(result => {
      const id: string = (result as any).id
      this.categorySubs = this.categoryService.getById(id).subscribe(result => {
        this.category = result.data
      })
    })
  }

  update(valid: boolean): void {
    if (valid) {
      this.categoryUpdate.categoryName = this.category.categoryName
      this.updateCategorySubs = this.categoryService.update(this.category).subscribe(result => {
        this.router.navigateByUrl('/admin/category/list')
      })
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/category/list')
  }

  ngOnDestroy(): void {
    this.activatedRouteSubs?.unsubscribe()
    this.categorySubs?.unsubscribe()
    this.updateCategorySubs?.unsubscribe()
  }

}
