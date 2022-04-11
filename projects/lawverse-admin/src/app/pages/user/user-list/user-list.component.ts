import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { GetUserDtoDataRes } from '../../../dto/user/get-user-dto-data-res';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{

  users$: Observable<GetUserDtoDataRes[]>

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.users$ = this.userService.getAll().pipe(map(result => result.data))
  }
}
