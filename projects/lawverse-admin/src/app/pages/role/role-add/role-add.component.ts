import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertRoleDtoReq } from 'src/app/dto/role/insert-role-dto-req';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit, OnDestroy {

  role: InsertRoleDtoReq = new InsertRoleDtoReq()

  roleSubs?: Subscription

  constructor(private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
  }

  onSubmit(valid: boolean): void {
    if (valid) {
      this.roleSubs = this.roleService.insert(this.role).subscribe(result => {
        this.router.navigateByUrl('/dashboard/role/list')
      })
    }
  }

  back(): void {
    this.router.navigateByUrl('/dashboard/role/list')
  }

  ngOnDestroy(): void {
    this.roleSubs?.unsubscribe()
  }
}
