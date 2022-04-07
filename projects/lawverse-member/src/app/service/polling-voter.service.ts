import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { DeletePollingVoterDtoRes } from "../dto/polling-voter/delete-polling-voter-dto-res"
import { GetAllPollingVoterDtoRes } from "../dto/polling-voter/get-all-polling-voter-dto-res"
import { GetByIdPollingVoterDtoRes } from "../dto/polling-voter/get-by-id-polling-voter-dto-res"
import { InsertPollingVoterDtoReq } from "../dto/polling-voter/insert-polling-voter-dto-req"
import { InsertPollingVoterDtoRes } from "../dto/polling-voter/insert-polling-voter-dto-res"

@Injectable({
    providedIn: 'root'
})

export class PollingVoterService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllPollingVoterDtoRes> {
        return this.http.get<GetAllPollingVoterDtoRes>('http://localhost:8080/polling-details')
    }

    getById(id: string): Observable<GetByIdPollingVoterDtoRes> {
        return this.http.get<GetByIdPollingVoterDtoRes>(`http://localhost:8080/polling-details/${id}`)
    }

    insert(insertPollingVoterDtoReq: InsertPollingVoterDtoReq): Observable<InsertPollingVoterDtoRes> {
        return this.http.post<InsertPollingVoterDtoRes>('http://localhost:8080/polling-details', insertPollingVoterDtoReq)
    }

    delete(id: string): Observable<DeletePollingVoterDtoRes> {
        return this.http.delete<DeletePollingVoterDtoRes>(`http://localhost:8080/polling-details/${id}`)
    }
}