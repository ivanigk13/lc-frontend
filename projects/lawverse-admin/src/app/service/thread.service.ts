import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { GetAllThreadDtoRes } from "../dto/thread/get-all-thread-dto-res"
import { GetByIdThreadDtoRes } from "../dto/thread/get-by-id-thread-dto-res"
import { InsertThreadDtoReq } from "../dto/thread/insert-thread-dto-req"
import { InsertThreadDtoRes } from "../dto/thread/insert-thread-dto-res"
import { UpdateThreadDtoReq } from "../dto/thread/update-thread-dto-req"
import { UpdateThreadDtoRes } from "../dto/thread/update-thread-dto-res"

@Injectable({
    providedIn: 'root'
})

export class ThreadService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllThreadDtoRes> {
        return this.http.get<GetAllThreadDtoRes>('http://localhost:8080/threads')
    }

    getById(id: string): Observable<GetByIdThreadDtoRes> {
        return this.http.get<GetByIdThreadDtoRes>(`http://localhost:8080/threads/${id}`)
    }

    insert(insertThreadDtoReq: InsertThreadDtoReq): Observable<InsertThreadDtoRes> {
        return this.http.post<InsertThreadDtoRes>('http://localhost:8080/threads', insertThreadDtoReq)
    }

    update(updateThreadDtoReq: UpdateThreadDtoReq): Observable<UpdateThreadDtoRes> {
        return this.http.put<UpdateThreadDtoRes>(`http://localhost:8080/threads`, updateThreadDtoReq)
    }

}