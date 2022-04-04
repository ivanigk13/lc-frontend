import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-thread',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {

  constructor(private title:Title) {
    title.setTitle('Thread List')
  }

  ngOnInit(): void {
  }

}
