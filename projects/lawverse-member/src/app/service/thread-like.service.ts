import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { DeleteThreadLikeDtoRes } from "../dto/thread-like/delete-thread-like-dto-res"
import { GetByIdThreadLikeDtoRes } from "../dto/thread-like/get-by-id-thread-like-dto-res"
import { InsertThreadLikeDtoReq } from "../dto/thread-like/insert-thread-like-dto-req"
import { InsertThreadLikeDtoRes } from "../dto/thread-like/insert-thread-like-dto-res"
import { UpdateThreadLikeDtoReq } from "../dto/thread-like/update-thread-like-dto-req"
import { UpdateThreadLikeDtoRes } from "../dto/thread-like/update-thread-like-dto-res"

@Injectable({
    providedIn: 'root'
})

export class ThreadLikeService {
    constructor(private http: HttpClient) { }

    getById(id: string): Observable<GetByIdThreadLikeDtoRes> {
        return this.http.get<GetByIdThreadLikeDtoRes>(`http://localhost:8080/thread-likes/${id}`)
    }

    getIdByThreadId(threadId: string, userId: string): Observable<GetByIdThreadLikeDtoRes> {
        return this.http.get<GetByIdThreadLikeDtoRes>(`http://localhost:8080/thread-likes/thread?threadId=${threadId}&userId=${userId}`)
    }

    insert(insertThreadLikeDtoReq: InsertThreadLikeDtoReq): Observable<InsertThreadLikeDtoRes> {
        return this.http.post<InsertThreadLikeDtoRes>('http://localhost:8080/thread-likes', insertThreadLikeDtoReq)
    }

    update(updateThreadLikeDtoReq : UpdateThreadLikeDtoReq): Observable<UpdateThreadLikeDtoRes> {
        return this.http.put<UpdateThreadLikeDtoRes>('http://localhost:8080/thread-likes', updateThreadLikeDtoReq)
    }

    getLikeCounterByThreadId(id : string) : Observable<number> {
        return this.http.get<number>(`http://localhost:8080/thread-likes/thread/${id}`)
    }

    isUserLikeByThreadId(threadId: string, userId: string): Observable<number> {
        return this.http.get<number>(`http://localhost:8080/thread-likes/thread/${threadId}/${userId}`)
    }

    delete(id: string): Observable<DeleteThreadLikeDtoRes> {
        return this.http.delete<DeleteThreadLikeDtoRes>(`http://localhost:8080/thread-likes/${id}`)
    }
}