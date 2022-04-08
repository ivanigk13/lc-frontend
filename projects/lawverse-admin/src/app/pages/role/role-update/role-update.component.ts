import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetRoleDtoDataRes } from 'src/app/dto/role/get-role-dto-data-res';
import { UpdateRoleDtoReq } from 'src/app/dto/role/update-role-dto-req';
import { RoleService } from 'src/app/service/role.service';

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
  RoleService
  ngOnInit(): void {
    this.activatedRouteSubs = this.activatedRoute.params.subscribe(result => {
      const id: string = (result as any).id
      this.roleSubs = this.roleService.getById(id).subscribe(result => {
        this.role = result.data
      })
    })
  }

  update(valid: boolean): void {
    if (valid) {
      this.roleUpdate.roleName = this.role.roleName
      this.updateRoleSubs = this.roleService.update(this.role).subscribe(result => {
        this.router.navigateByUrl('/admin/role/list')
      })
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/role/list')
  }

  ngOnDestroy(): void {
    this.activatedRouteSubs?.unsubscribe()
    this.roleSubs?.unsubscribe()
    this.updateRoleSubs?.unsubscribe()
  }

}
