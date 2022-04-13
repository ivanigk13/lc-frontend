import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, Observable } from 'rxjs';
import { GetRoleDtoDataRes } from '../../../dto/role/get-role-dto-data-res';
import { RoleService } from '../../../service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {

  dataPerPage = 2
  record = 0
  roles$: Observable<GetRoleDtoDataRes[]>
  roles : GetRoleDtoDataRes[] = []

  constructor(private title:Title,private router: Router, private roleService: RoleService) {
    title.setTitle('Role List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(start:number = 0, max:number = this.dataPerPage, query?:string){
    const result = await firstValueFrom(this.roleService.getAll(start,max,query))
    this.roles = result.data
    this.record = result.rows
  }

  onClick(): void {
    this.router.navigateByUrl('/admin/role/new')
  }

  update(id: string) {
    this.router.navigateByUrl(`/admin/role/${id}`)
  }

  delete(id: string): void {
    const result = firstValueFrom(this.roleService.delete(id))
    if (result) this.getData(0, this.dataPerPage)
  }
}
