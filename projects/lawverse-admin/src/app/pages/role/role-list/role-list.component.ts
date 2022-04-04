import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetRoleDtoDataRes } from 'src/app/dto/role/get-role-dto-data-res';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit, OnDestroy {

  roles: GetRoleDtoDataRes[] = []

  roleSubs?: Subscription

  constructor(private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.roleSubs = this.roleService.getAll().subscribe(result => {
      this.roles = result.data
    })
  }

  onClick(): void {
    this.router.navigateByUrl('/dashboard/role/new')
  }

  ngOnDestroy(): void {
    this.roleSubs?.unsubscribe()
  }
}
