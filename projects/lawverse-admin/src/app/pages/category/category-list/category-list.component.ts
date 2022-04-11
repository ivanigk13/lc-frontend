import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription, firstValueFrom } from 'rxjs';
import { GetCategoryDtoDataRes } from 'src/app/dto/category/get-category-dto-data-res';
import { CategoryService } from 'src/app/service/category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
 
  categories$: Observable<GetCategoryDtoDataRes[]>

  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.categories$ = this.categoryService.getAll().pipe(map(result => result.data))
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/category/new')
  }

  update(id: string) {
    this.router.navigateByUrl(`/admin/category/${id}`)
  }

  async delete(id: string): Promise<void> {
    const result = await firstValueFrom(this.categoryService.deleteById(id))
    if(result) this.getData()
  }

}
