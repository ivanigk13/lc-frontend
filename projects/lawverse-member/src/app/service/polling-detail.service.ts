import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { DeletePollingDetailDtoRes } from "../dto/polling-detail/delete-polling-detail-dto-res"
import { GetAllPollingDetailDtoRes } from "../dto/polling-detail/get-all-polling-detail-dto-res"
import { GetByIdPollingDetailDtoRes } from "../dto/polling-detail/get-by-id-polling-detail-dto-res"
import { InsertPollingDetailDtoReq } from "../dto/polling-detail/insert-polling-detail-dto-req"
import { InsertPollingDetailDtoRes } from "../dto/polling-detail/insert-polling-detail-dto-res"
import { UpdatePollingDetailDtoReq } from "../dto/polling-detail/update-polling-detail-dto-req"
import { UpdatePollingDetailDtoRes } from "../dto/polling-detail/update-polling-detail-dto-res"

@Injectable({
    providedIn: 'root'
})

export class PollingDetailService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllPollingDetailDtoRes> {
        return this.http.get<GetAllPollingDetailDtoRes>('http://localhost:8080/polling-details')
    }

    getAllByHeaderId(id: string): Observable<GetAllPollingDetailDtoRes> {
        return this.http.get<GetAllPollingDetailDtoRes>(`http://localhost:8080/polling-details/header/${id}`)
    }

    getById(id: string): Observable<GetByIdPollingDetailDtoRes> {
        return this.http.get<GetByIdPollingDetailDtoRes>(`http://localhost:8080/polling-details/${id}`)
    }

    insert(insertPollingDetailDtoReq: InsertPollingDetailDtoReq): Observable<InsertPollingDetailDtoRes> {
        return this.http.post<InsertPollingDetailDtoRes>('http://localhost:8080/polling-details', insertPollingDetailDtoReq)
    }

    delete(id: string): Observable<DeletePollingDetailDtoRes> {
        return this.http.delete<DeletePollingDetailDtoRes>(`http://localhost:8080/polling-details/${id}`)
    }

    update(updatePollingDetailDtoreq: UpdatePollingDetailDtoReq): Observable<UpdatePollingDetailDtoRes> {
        return this.http.put<UpdatePollingDetailDtoRes>('http://localhost:8080/polling-details', updatePollingDetailDtoreq)
    }
}