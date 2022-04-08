import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetUserDtoDataRes } from '../../../dto/user/get-user-dto-data-res';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: GetUserDtoDataRes[] = []

  userSubs?: Subscription
  deleteUserSubs?: Subscription

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.userSubs = this.userService.getAll().subscribe(result => {
      this.users = result.data
    })
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe()
    this.deleteUserSubs?.unsubscribe()
  }
}
