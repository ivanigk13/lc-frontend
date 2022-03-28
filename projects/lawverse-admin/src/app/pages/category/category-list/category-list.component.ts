import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  categories = [
    { name: 'HR Consultan', code: 'HRC' },
    { name: 'HR It Consultan', code: 'HRIC' },
    { name: 'HR Privacy Consultan', code: 'HRPC' },
    { name: 'HR', code: 'HR' },
  ]

  onClick() : void {
    this.router.navigateByUrl('/category/new')
  }

}
