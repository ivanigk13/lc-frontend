import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { DeletePollingHeaderDtoRes } from "../dto/polling-header/delete-polling-header-dto-res"
import { GetAllPollingHeaderDtoRes } from "../dto/polling-header/get-all-polling-header-dto-res"
import { GetByIdPollingHeaderDtoRes } from "../dto/polling-header/get-by-id-polling-header-dto-res"
import { GetByThreadIdPollingHeaderDtoRes } from "../dto/polling-header/get-by-thread-id-polling-header-dto-res"
import { InsertPollingHeaderDtoReq } from "../dto/polling-header/insert-polling-header-dto-req"
import { InsertPollingHeaderDtoRes } from "../dto/polling-header/insert-polling-header-dto-res"

@Injectable({
    providedIn: 'root'
})

export class PollingHeaderService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllPollingHeaderDtoRes> {
        return this.http.get<GetAllPollingHeaderDtoRes>('http://localhost:8080/polling-headers')
    }

    getByThreadId(id: string): Observable<GetByThreadIdPollingHeaderDtoRes> {
        return this.http.get<GetByThreadIdPollingHeaderDtoRes>(`http://localhost:8080/polling-headers/thread/${id}`)
    }

    getById(id: string): Observable<GetByIdPollingHeaderDtoRes> {
        return this.http.get<GetByIdPollingHeaderDtoRes>(`http://localhost:8080/polling-headers/${id}`)
    }

    insert(insertPollingHeaderDtoReq: InsertPollingHeaderDtoReq): Observable<InsertPollingHeaderDtoRes> {
        return this.http.post<InsertPollingHeaderDtoRes>('http://localhost:8080/polling-headers', insertPollingHeaderDtoReq)
    }

    delete(id: string): Observable<DeletePollingHeaderDtoRes> {
        return this.http.delete<DeletePollingHeaderDtoRes>(`http://localhost:8080/polling-headers/${id}`)
    }
}