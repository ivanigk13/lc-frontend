import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteArticleDtoRes } from "../dto/article/delete-article-dto-res";
import { GetAllArticleDtoRes } from "../dto/article/get-all-article-dto-res";
import { GetByIdArticleDtoRes } from "../dto/article/get-by-id-article-dto-res";
import { InsertArticleDtoReq } from "../dto/article/insert-article-dto-req";
import { InsertArticleDtoRes } from "../dto/article/insert-article-dto-res";
import { UpdateArticleDtoReq } from "../dto/article/update-article-dto-req";
import { UpdateArticleDtoRes } from "../dto/article/update-article-dto-res";

@Injectable({
    providedIn: 'root'
})

export class ArticleService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllArticleDtoRes> {
        return this.http.get<GetAllArticleDtoRes>('http://localhost:8080/articles')
    }

    getById(id: number): Observable<GetByIdArticleDtoRes> {
        return this.http.get<GetByIdArticleDtoRes>(`http://localhost:8080/articles/${id}`)
    }

    insert(insertArticleDtoReq: InsertArticleDtoReq, file: File): Observable<InsertArticleDtoRes> {
        const formData: FormData = new FormData()
        formData.append('data', JSON.stringify(insertArticleDtoReq))
        if (file) {
            formData.append('file', file)            
        }
        return this.http.post<InsertArticleDtoRes>('http://localhost:8080/articles', formData)
    }

    update(updateArticleDtoReq: UpdateArticleDtoReq, file: File[]): Observable<UpdateArticleDtoRes> {
        const formData: FormData = new FormData()
        formData.append('data', JSON.stringify(updateArticleDtoReq))
        if (file) {
            formData.append('file', file[0])
            formData.append('file', file[1])
        }
        return this.http.put<UpdateArticleDtoRes>(`http://localhost:8080/articles`, formData)
    }

    delete(id: number): Observable<DeleteArticleDtoRes> {
        return this.http.delete<DeleteArticleDtoRes>(`http://localhost:8080/articles/${id}`)
    }
}