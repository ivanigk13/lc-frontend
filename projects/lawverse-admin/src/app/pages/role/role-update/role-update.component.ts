import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetRoleDtoDataRes } from '../../../dto/role/get-role-dto-data-res';
import { UpdateRoleDtoReq } from '../../../dto/role/update-role-dto-req';
import { RoleService } from '../../../service/role.service';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit {

  roleUpdate: UpdateRoleDtoReq = new UpdateRoleDtoReq()
  role: GetRoleDtoDataRes = new GetRoleDtoDataRes()

  activatedRouteSubs?: Subscription
  roleSubs?: Subscription
  updateRoleSubs?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private roleService: RoleService) {
    this.title.setTitle('Lawverse: Update - Role')
  }
  
  ngOnInit(): void {
    this.startInit()
  }

  async startInit() {
    const result = await firstValueFrom(this.activatedRoute.params)
    const id: string = (result as any).id
    const resultRole = await firstValueFrom(this.roleService.getById(id))
    this.role = resultRole.data
  }

  async update(valid: boolean): Promise<void> {
    if (valid) {
      this.roleUpdate.roleName = this.role.roleName
      const result = await firstValueFrom(this.roleService.update(this.role))
      if(result) {
        this.router.navigateByUrl('/admin/role/list')
      }
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/role/list')
  }

}
