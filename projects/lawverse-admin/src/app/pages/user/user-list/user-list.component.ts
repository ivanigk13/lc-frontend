import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { GetUserDtoDataRes } from '../../../dto/user/get-user-dto-data-res';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  dataPerPage = 3
  record = 0
  users$: Observable<GetUserDtoDataRes[]>
  users : GetUserDtoDataRes[] = []

  constructor(private title:Title,private userService: UserService) {
    title.setTitle('User List')
  }

  loadData(event: LazyLoadEvent) {
    this.getData(event.first, event.rows, event.globalFilter)
  }

  async getData(start:number = 0, max:number = this.dataPerPage, query?:string) {
    const result = await firstValueFrom(this.userService.getAll(start,max,query))
    this.users = result.data
    this.record = result.rows
  }
}
