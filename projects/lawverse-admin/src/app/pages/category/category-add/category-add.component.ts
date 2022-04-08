import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertCategoryDtoReq } from 'src/app/dto/category/insert-category-dto-req';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit, OnDestroy {

  category: InsertCategoryDtoReq = new InsertCategoryDtoReq()

  categorySubs?: Subscription
  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  onSubmit(valid: boolean): void {
    if (valid) {
      this.categorySubs = this.categoryService.insert(this.category).subscribe(result => {
        this.router.navigateByUrl('/admin/category/list')
      })
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/category/list')
  }

  ngOnDestroy(): void {
    this.categorySubs?.unsubscribe()
  }
}
