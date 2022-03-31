import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteActivityDtoRes } from "../dto/activity/delete-activity-dto-res";
import { GetAllActivityDtoRes } from "../dto/activity/get-all-activity-dto-res";
import { GetByIdActivityDtoRes } from "../dto/activity/get-by-id-activity-dto-res";
import { InsertActivityDtoReq } from "../dto/activity/insert-activity-dto-req";
import { InsertActivityDtoRes } from "../dto/activity/insert-activity-dto-res";
import { UpdateActivityDtoReq } from "../dto/activity/update-activity-dto-req";
import { UpdateActivityDtoRes } from "../dto/activity/update-activity-dto-res";

@Injectable({
    providedIn : 'root'
})

export class ActivityService {
    constructor(private http:HttpClient){}

    getAll() : Observable<GetAllActivityDtoRes> {
        return this.http.get<GetAllActivityDtoRes>('http://localhost:8080/activities')
    }

    getById(id : number) : Observable<GetByIdActivityDtoRes> {
        return this.http.get<GetByIdActivityDtoRes>(`http://localhost:8080/activities/${id}`)
    }

    insert(insertActivityDtoReq : InsertActivityDtoReq, file : File[]) : Observable<InsertActivityDtoRes> {
        const formData: FormData = new FormData()
        formData.append('data', JSON.stringify(insertActivityDtoReq))
        if(file) {
            formData.append('file',file[0])
            formData.append('file',file[1])
        }
        return this.http.post<InsertActivityDtoRes>('http://localhost:8080/activities',formData)
    }

    update(updateActivityDtoReq : UpdateActivityDtoReq, file : File[]) : Observable<UpdateActivityDtoRes> {
        const formData: FormData = new FormData()
        formData.append('data', JSON.stringify(updateActivityDtoReq))
        if(file) {
            formData.append('file',file[0])
            formData.append('file',file[1])
        }
        return this.http.put<UpdateActivityDtoRes>(`http://localhost:8080/activities`,formData)
    }

    delete(id : number) : Observable<DeleteActivityDtoRes> {
        return this.http.delete<DeleteActivityDtoRes>(`http://localhost:8080/activities/${id}`)
    }
}