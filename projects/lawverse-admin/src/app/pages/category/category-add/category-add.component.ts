import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  category : InsertCategoryDtoReq = new InsertCategoryDtoReq()
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigateByUrl('/category/list')
  }

}

class InsertCategoryDtoReq {
  categoryName!: string
  categoryCode!: string
}
