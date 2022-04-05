import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteActivityTypeDtoRes } from "../dto/activity-type/delete-activity-type-dto-res";
import { GetAllActivityTypeDtoRes } from "../dto/activity-type/get-all-activity-type-dto-res";
import { GetByIdActivityTypeDtoRes } from "../dto/activity-type/get-by-id-activity-type-dto-res";
import { InsertActivityTypeDtoReq } from "../dto/activity-type/insert-activity-type-dto-req";
import { InsertActivityTypeDtoRes } from "../dto/activity-type/insert-activity-type-dto-res";
import { UpdateActivityTypeDtoReq } from "../dto/activity-type/update-activity-type-dto-req";
import { UpdateActivityTypeDtoRes } from "../dto/activity-type/update-activity-type-dto-res";

@Injectable({
    providedIn: 'root'
})

export class ActivityTypeService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllActivityTypeDtoRes> {
        return this.http.get<GetAllActivityTypeDtoRes>('http://localhost:8080/activity-types')
    }

    getById(id: number): Observable<GetByIdActivityTypeDtoRes> {
        return this.http.get<GetByIdActivityTypeDtoRes>(`http://localhost:8080/activity-types/${id}`)
    }

    insert(insertActivityTypeDtoReq: InsertActivityTypeDtoReq): Observable<InsertActivityTypeDtoRes> {                   
        return this.http.post<InsertActivityTypeDtoRes>('http://localhost:8080/activity-types', insertActivityTypeDtoReq)
    }

    update(updateActivityTypeDtoReq: UpdateActivityTypeDtoReq, file: File[]): Observable<UpdateActivityTypeDtoRes> {
        return this.http.put<UpdateActivityTypeDtoRes>(`http://localhost:8080/activity-types`, updateActivityTypeDtoReq)
    }

    delete(id: number): Observable<DeleteActivityTypeDtoRes> {
        return this.http.delete<DeleteActivityTypeDtoRes>(`http://localhost:8080/activity-types/${id}`)
    }
}