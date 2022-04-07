import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteThreadBookmarkDtoRes } from "../dto/thread-bookmark/delete-thread-bookmark-dto-res";
import { GetAllThreadBookmarkDtoRes } from "../dto/thread-bookmark/get-all-thread-bookmark-dto-res";
import { GetByIdThreadBookmarkDtoRes } from "../dto/thread-bookmark/get-by-id-thread-bookmark-dto-res";
import { InsertThreadBookmarkDtoReq } from "../dto/thread-bookmark/insert-thread-bookmark-dto-req";
import { InsertThreadBookmarkDtoRes } from "../dto/thread-bookmark/insert-thread-bookmark-dto-res";

@Injectable({
    providedIn : 'root'
})

export class ThreadBookmarkService {
    constructor(private http:HttpClient){}

    getAll() : Observable<GetAllThreadBookmarkDtoRes> {
        return this.http.get<GetAllThreadBookmarkDtoRes>('http://localhost:8080/thread-bookmarks')
    }

    getById(id : number) : Observable<GetByIdThreadBookmarkDtoRes> {
        return this.http.get<GetByIdThreadBookmarkDtoRes>(`http://localhost:8080/thread-bookmarks/${id}`)
    }

    insert(insertThreadBookmarkDtoReq : InsertThreadBookmarkDtoReq) : Observable<InsertThreadBookmarkDtoRes> {
        return this.http.post<InsertThreadBookmarkDtoRes>('http://localhost:8080/thread-bookmarks',insertThreadBookmarkDtoReq)
    }

    delete(id : number) : Observable<DeleteThreadBookmarkDtoRes> {
        return this.http.delete<DeleteThreadBookmarkDtoRes>(`http://localhost:8080/thread-bookmarks/${id}`)
    }
}