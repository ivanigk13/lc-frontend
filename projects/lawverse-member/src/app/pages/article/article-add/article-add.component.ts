import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { firstValueFrom, map, Subscription } from 'rxjs';
import { InsertArticleDtoReq } from 'src/app/dto/article/insert-article-dto-req';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddComponent implements OnInit {

  article: InsertArticleDtoReq = new InsertArticleDtoReq() 
  file?: File

  constructor(private title : Title, private router:Router, private articleService : ArticleService) {
    this.title.setTitle("Article Add")
   }
  ngOnInit(): void {
  }

  async onSubmit(data : boolean) : Promise<void> {
    if(data){
      const result = await firstValueFrom(this.articleService.insert(this.article, this.file).pipe(map(result => result.data)))
        if(result) this.router.navigateByUrl('/member/article')        
    }
  }

  change(event : any) : void {
    this.file = event.target.files[0] 
  }

}
