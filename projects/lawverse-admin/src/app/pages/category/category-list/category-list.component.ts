import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, firstValueFrom } from 'rxjs';
import { GetCategoryDtoDataRes } from '../../../dto/category/get-category-dto-data-res';
import { CategoryService } from '../../../service/category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent{
 
  dataPerPage : number = 10
  record = 0
  categories$: Observable<GetCategoryDtoDataRes[]>
  categories:GetCategoryDtoDataRes[] = []

  constructor(private title:Title,private router: Router, private categoryService: CategoryService) {
    title.setTitle('Category List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(start:number = 0, max:number = this.dataPerPage, query?:string) {
    const result = await firstValueFrom(this.categoryService.getAll(start, max, query))
    this.categories = result.data
    this.record = result.rows
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/category/new')
  }

  update(id: string) {
    this.router.navigateByUrl(`/admin/category/${id}`)
  }

  async delete(id: string): Promise<void> {
    const result = await firstValueFrom(this.categoryService.deleteById(id))
    if(result) this.getData(0,this.dataPerPage)
  }

}
