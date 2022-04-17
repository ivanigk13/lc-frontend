import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { firstValueFrom, map, Observable, } from 'rxjs';
import { RoleList } from 'src/app/constant/role-list';
import { LoginService } from 'src/app/service/login.service';
import { RoleService } from 'src/app/service/role.service';
import { ThreadTypeList } from '../../../constant/thread-type-list';
import { InsertPollingHeaderDtoReq } from '../../../dto/polling-header/insert-polling-header-dto-req';
import { GetThreadTypeDtoDataRes } from '../../../dto/thread-type/get-thread-type-dto-data-res';
import { InsertThreadDtoReq } from '../../../dto/thread/insert-thread-dto-req';
import { PollingHeaderService } from '../../../service/polling-header.service';
import { ThreadTypeService } from '../../../service/thread-type.service';
import { ThreadService } from '../../../service/thread.service';

@Component({
  selector: 'app-thread-add',
  templateUrl: './thread-add.component.html',
  styleUrls: ['./thread-add.component.scss']
})
export class ThreadAddComponent implements OnInit {

  file?: File

  threadTypes: GetThreadTypeDtoDataRes[] = []
  insertThread: InsertThreadDtoReq = new InsertThreadDtoReq()
  insertPollingHeader: InsertPollingHeaderDtoReq = new InsertPollingHeaderDtoReq()

  selectedDrop: any
  pollingDetailCounter: number = 2
  pollingCode: string = ThreadTypeList.POLLING
  reduceDisable: boolean = true

  pollingNames: String[] = []
  pollingName!: string
  isLoading : boolean = false

  constructor(private title: Title, private threadTypeService: ThreadTypeService, private threadService: ThreadService,
    private pollingHeaderService: PollingHeaderService, private router: Router, private loginService: LoginService) {
    this.title.setTitle('Insert Thread')
  }

  ngOnInit(): void {
    this.getThreadType()
  }

  async getThreadType(): Promise<void> {
    const user = this.loginService.getData()
    if (user.roleCode == RoleList.MEMBER) {
      this.threadTypes = await firstValueFrom(this.threadTypeService.getAll().pipe(map(result => result.data)))
      this.threadTypes.splice((this.threadTypes.length - 1), 1)
    } else if (user.roleCode == RoleList.PREMIUM) {
      this.threadTypes = await firstValueFrom(this.threadTypeService.getAll().pipe(map(result => result.data)))
    }
  }

  onAdd(): void {
    this.pollingNames.push(this.pollingName)
  }

  createRange(num: number) {
    return new Array(num)
  }

  async insert(valid: boolean) {
    if (valid) {   
      this.isLoading = true   
      const result = await firstValueFrom(this.threadService.insert(this.insertThread, this.file).pipe(map(result => result.data)))
      if (result) {        
        if (this.selectedDrop == this.pollingCode) {
          this.insertPollingHeader.threadId = result.id
          this.insertPollingHeader.data = this.pollingNames
          const id = await firstValueFrom(this.pollingHeaderService.insert(this.insertPollingHeader).pipe(map(result => result.data)))
          if (id) {            
            this.router.navigateByUrl('/member/thread')
          }
        } else {          
          this.router.navigateByUrl('/member/thread')
        }
      }

    }
  }

  changeFile(event: any) {
    this.file = event.target.files[0]    
  }

  async changeType() {
    const result = await firstValueFrom(this.threadTypeService.getById(this.insertThread.threadTypeId).pipe(map(result => result.data)))
    this.selectedDrop = result.threadTypeCode
  }

  onDelete(index: number): void {
    this.pollingNames.splice(index, 1)
  }

}

