import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InsertCategoryDtoReq } from '../../../dto/category/insert-category-dto-req';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  category: InsertCategoryDtoReq = new InsertCategoryDtoReq()

  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  async onSubmit(valid: boolean): Promise<void> {
    if (valid) {
      const result = await firstValueFrom(this.categoryService.insert(this.category))
      if(result){
        this.router.navigateByUrl('/admin/category/list')
      }
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/category/list')
  }

}
