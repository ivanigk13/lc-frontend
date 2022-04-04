import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertArticleDtoReq } from 'src/app/dto/article/insert-article-dto-req';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit {

  article : InsertArticleDtoReq = new InsertArticleDtoReq()
  articleSubs !: Subscription
  file?: File

  constructor(private title : Title, private router:Router, private articleService : ArticleService) {
    this.title.setTitle("Article Add")
   }
  ngOnInit(): void {
  }

  onSubmit(data : boolean) : void {
    if(data){
      this.articleSubs = this.articleService.insert(this.article, this.file).subscribe( result => {
        if (result.data.id){
          this.router.navigateByUrl('/article')
        }
      })
    }
  }

  change(event : any) : void {
    this.file = event.target.files[0]
    console.log(event.target.files[0])
  }

}
