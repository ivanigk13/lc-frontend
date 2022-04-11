import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { GetRoleDtoDataRes } from '../../../dto/role/get-role-dto-data-res';
import { RoleService } from '../../../service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roles$: Observable<GetRoleDtoDataRes[]>

  constructor(private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.roles$ = this.roleService.getAll().pipe(map(result => result.data))
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/role/new')
  }

  update(id: string) {
    this.router.navigateByUrl(`/admin/role/${id}`)
  }

  delete(id: string): void {
    const result = firstValueFrom(this.roleService.delete(id))
    if (result) this.getData()
  }
}
