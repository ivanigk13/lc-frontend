import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeletePositionDtoRes } from "../dto/position/delete-position-dto-res";
import { GetAllPositionDtoRes } from "../dto/position/get-all-position-dto-res";
import { GetByIdPositionDtoRes } from "../dto/position/get-by-id-position-dto-res";
import { InsertPositionDtoReq } from "../dto/position/insert-position-dto-req";
import { InsertPositionDtoRes } from "../dto/position/insert-position-dto-res";
import { UpdatePositionDtoReq } from "../dto/position/update-position-dto-req";
import { UpdatePositionDtoRes } from "../dto/position/update-position-dto-res";

@Injectable({
    providedIn : 'root'
})

export class PositionService {
    constructor(private http:HttpClient){}

    getAll() : Observable<GetAllPositionDtoRes> {
        return this.http.get<GetAllPositionDtoRes>('http://localhost:8080/positions')
    }

    getById(id : number) : Observable<GetByIdPositionDtoRes> {
        return this.http.get<GetByIdPositionDtoRes>(`http://localhost:8080/positions/${id}`)
    }

    insert(insertPositionDtoReq : InsertPositionDtoReq) : Observable<InsertPositionDtoRes> {
        return this.http.post<InsertPositionDtoRes>('http://localhost:8080/positions',insertPositionDtoReq)
    }

    update(updatePositionDtoReq : UpdatePositionDtoReq) : Observable<UpdatePositionDtoRes> {
        return this.http.put<UpdatePositionDtoRes>(`http://localhost:8080/positions`,updatePositionDtoReq)
    }

    delete(id : number) : Observable<DeletePositionDtoRes> {
        return this.http.delete<DeletePositionDtoRes>(`http://localhost:8080/positions/${id}`)
    }
}