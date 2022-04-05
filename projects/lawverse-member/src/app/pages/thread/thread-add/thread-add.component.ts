import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThreadTypeList } from 'src/app/constant/thread-type-list';
import { InsertPollingDetailDtoReq } from 'src/app/dto/polling-detail/insert-polling-detail-dto-req';
import { InsertPollingHeaderDtoReq } from 'src/app/dto/polling-header/insert-polling-header-dto-req';
import { GetThreadTypeDtoDataRes } from 'src/app/dto/thread-type/get-thread-type-dto-data-res';
import { InsertThreadDtoReq } from 'src/app/dto/thread/insert-thread-dto-req';
import { PollingDetailService } from 'src/app/service/polling-detail.service';
import { PollingHeaderService } from 'src/app/service/polling-header.service';
import { ThreadTypeService } from 'src/app/service/thread-type.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-thread-add',
  templateUrl: './thread-add.component.html',
  styleUrls: ['./thread-add.component.scss']
})
export class ThreadAddComponent implements OnInit, OnDestroy {

  file?: File

  selectedDrop: any
  pollingDetailCounter: number = 2
  pollingCode: string = ThreadTypeList.POLLING
  reduceDisable: boolean = true

  threadTypes: GetThreadTypeDtoDataRes[] = []
  threadTypeSubs?: Subscription
  threadTypeByIdSubs?: Subscription

  insertThread: InsertThreadDtoReq = new InsertThreadDtoReq()
  insertSubs?: Subscription
  insertPollingHeaderSubs?: Subscription

  insertPollingHeader: InsertPollingHeaderDtoReq = new InsertPollingHeaderDtoReq()
  pollingNames: String[] = []
  pollingName!: string

  constructor(private title: Title, private threadTypeService: ThreadTypeService, private threadService: ThreadService,
    private pollingHeaderService: PollingHeaderService, private router: Router) {
    this.title.setTitle('Insert Thread')
  }

  ngOnInit(): void {
    this.threadTypeSubs = this.threadTypeService.getAll().subscribe(result => {
      this.threadTypes = result.data
    })
  }

  onAdd(): void {
    this.pollingNames.push(this.pollingName)
  }

  createRange(num: number) {
    return new Array(num)
  }

  insert(valid: boolean) {
    if (valid) {
      this.insertSubs = this.threadService.insert(this.insertThread, this.file).subscribe(result => {
        if (this.selectedDrop == this.pollingCode) {
          this.insertPollingHeader.threadId = result.data.id
          this.insertPollingHeader.data = this.pollingNames
          this.insertPollingHeaderSubs = this.pollingHeaderService.insert(this.insertPollingHeader).subscribe(result => {
            this.router.navigateByUrl('/thread')
          })
        }
      })
    }
  }

  changeFile(event: any) {
    this.file = event.target.files[0]
  }

  changeType() {
    this.threadTypeByIdSubs = this.threadTypeService.getById(this.insertThread.threadTypeId).subscribe(result => {
      this.selectedDrop = result.data.threadTypeCode
    })
  }

  onDelete(index: number): void {
    this.pollingNames.splice(index, 1)
  }

  ngOnDestroy(): void {
    this.threadTypeSubs?.unsubscribe()
    this.threadTypeByIdSubs?.unsubscribe()
    this.insertSubs?.unsubscribe()
    this.insertPollingHeaderSubs?.unsubscribe()
  }

}

