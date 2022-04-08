import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetRoleDtoDataRes } from '../../../dto/role/get-role-dto-data-res';
import { RoleService } from '../../../service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit, OnDestroy {

  roles: GetRoleDtoDataRes[] = []

  roleSubs?: Subscription
  deleteRoleSubs?: Subscription

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
    this.router.navigateByUrl('/admin/role/new')
  }

  update(id: string) {
    this.router.navigateByUrl(`/admin/role/${id}`)
  }

  delete(id: string): void {
    this.deleteRoleSubs = this.roleService.delete(id).subscribe(result => {
      if (result.msg) {
        this.getData()
      }
    })
  }

  ngOnDestroy(): void {
    this.roleSubs?.unsubscribe()
    this.deleteRoleSubs?.unsubscribe()
  }
}
