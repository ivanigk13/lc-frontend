import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetCategoryDtoDataRes } from 'src/app/dto/category/get-category-dto-data-res';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  categories: GetCategoryDtoDataRes[] = []

  categorySubs?: Subscription

  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.categorySubs = this.categoryService.getAll().subscribe(result => {
      this.categories = result.data
    })
  }

  onClick(): void {
    this.router.navigateByUrl('/dashboard/category/new')
  }

  ngOnDestroy(): void {
    this.categorySubs.unsubscribe()
  }

}
