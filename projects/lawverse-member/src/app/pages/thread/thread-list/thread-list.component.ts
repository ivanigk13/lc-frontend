import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {


  thread: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic ng, remaining essentially unchanged.It was popularised in the 1960s with the  release of Letraset sheets containing Lorem Ipsum passages, and more recently withdesktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

  constructor() { }

  ngOnInit(): void {
  }

}
