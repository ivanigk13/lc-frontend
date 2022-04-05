import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { DeleteThreadTypeDtoRes } from "../dto/thread-type/delete-thread-type-dto-res"
import { GetAllThreadTypeDtoRes } from "../dto/thread-type/get-all-thread-type-dto-res"
import { GetByIdThreadTypeDtoRes } from "../dto/thread-type/get-by-id-thread-type-dto-res"
import { InsertThreadTypeDtoReq } from "../dto/thread-type/insert-thread-type-dto-req"
import { InsertThreadTypeDtoRes } from "../dto/thread-type/insert-thread-type-dto-res"
import { UpdateThreadTypeDtoReq } from "../dto/thread-type/update-thread-type-dto-req"
import { UpdateThreadTypeDtoRes } from "../dto/thread-type/update-thread-type-dto-res"

@Injectable({
    providedIn: 'root'
})

export class ThreadTypeService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllThreadTypeDtoRes> {
        return this.http.get<GetAllThreadTypeDtoRes>('http://localhost:8080/thread-types')
    }

    getById(id: string): Observable<GetByIdThreadTypeDtoRes> {
        return this.http.get<GetByIdThreadTypeDtoRes>(`http://localhost:8080/thread-types/${id}`)
    }

    insert(insertThreadTypeDtoReq: InsertThreadTypeDtoReq): Observable<InsertThreadTypeDtoRes> {
        return this.http.post<InsertThreadTypeDtoRes>('http://localhost:8080/thread-types', insertThreadTypeDtoReq)
    }

    update(updateThreadTypeDtoReq: UpdateThreadTypeDtoReq): Observable<UpdateThreadTypeDtoRes> {
        return this.http.put<UpdateThreadTypeDtoRes>(`http://localhost:8080/thread-types`, updateThreadTypeDtoReq)
    }

    delete(id: string): Observable<DeleteThreadTypeDtoRes> {
        return this.http.delete<DeleteThreadTypeDtoRes>(`http://localhost:8080/thread-types/${id}`)
    }
}