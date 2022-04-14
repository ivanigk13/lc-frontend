import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InsertRoleDtoReq } from '../../../dto/role/insert-role-dto-req';
import { RoleService } from '../../../service/role.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

  role: InsertRoleDtoReq = new InsertRoleDtoReq()

  constructor(private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
  }

  async onSubmit(valid: boolean): Promise<void> {
    if (valid) {
      const result = await firstValueFrom(this.roleService.insert(this.role))
      if(result) {
        this.router.navigateByUrl('/admin/role/list')
      }
    }
  }

  back(): void {
    this.router.navigateByUrl('/admin/role/list')
  }

}
