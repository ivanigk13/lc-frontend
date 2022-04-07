import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { GetAllByThreadIdThreadDetailDtoRes } from "../dto/thread-detail/get-all-by-thread-id-thread-detail-dto"
import { GetByIdThreadDetailDtoRes } from "../dto/thread-detail/get-by-id-thread-detail-dto-res"
import { InsertThreadDetailDtoReq } from "../dto/thread-detail/insert-thread-detail-dto-req"
import { InsertThreadDetailDtoRes } from "../dto/thread-detail/insert-thread-detail-dto-res"

@Injectable({
    providedIn: 'root'
})

export class ThreadDetailService {
    constructor(private http: HttpClient) { }

    getAllByThreadId(id : string): Observable<GetAllByThreadIdThreadDetailDtoRes> {
        return this.http.get<GetAllByThreadIdThreadDetailDtoRes>(`http://localhost:8080/thread-details/thread/${id}`)
    }

    getById(id: string): Observable<GetByIdThreadDetailDtoRes> {
        return this.http.get<GetByIdThreadDetailDtoRes>(`http://localhost:8080/thread-details/${id}`)
    }

    insert(insertThreadDetailDtoReq: InsertThreadDetailDtoReq): Observable<InsertThreadDetailDtoRes> {
        return this.http.post<InsertThreadDetailDtoRes>('http://localhost:8080/thread-details', insertThreadDetailDtoReq)
    }

    getCommentTotalByThreadId(id : string) : Observable<number> {
        return this.http.get<number>(`http://localhost:8080/thread-details/count/${id}`)
    }
}