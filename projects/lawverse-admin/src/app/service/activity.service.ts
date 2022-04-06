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
    providedIn: 'root'
})

export class ActivityService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllActivityDtoRes> {
        return this.http.get<GetAllActivityDtoRes>('http://localhost:8080/activities')
    }

    getAllEvent(): Observable<GetAllActivityDtoRes> {
        return this.http.get<GetAllActivityDtoRes>('http://localhost:8080/activities/approved-event')
    }

    getAllCourse(): Observable<GetAllActivityDtoRes> {
        return this.http.get<GetAllActivityDtoRes>('http://localhost:8080/activities/approved-course')
    }

    getById(id: number): Observable<GetByIdActivityDtoRes> {
        return this.http.get<GetByIdActivityDtoRes>(`http://localhost:8080/activities/${id}`)
    }

    insert(insertActivityDtoReq: InsertActivityDtoReq, files: File[]): Observable<InsertActivityDtoRes> {
        const formData: FormData = new FormData()
        formData.append('data', JSON.stringify(insertActivityDtoReq))
        if (files[0]) formData.append('file', files[0])
        if (files[1]) formData.append('file', files[1])
        return this.http.post<InsertActivityDtoRes>('http://localhost:8080/activities', formData)
    }

    update(updateActivityDtoReq: UpdateActivityDtoReq, files: File[]): Observable<UpdateActivityDtoRes> {
        const formData: FormData = new FormData()
        formData.append('data', JSON.stringify(updateActivityDtoReq))
        if (files[0]) formData.append('file', files[0])
        if (files[1]) formData.append('file', files[1])
        return this.http.put<UpdateActivityDtoRes>(`http://localhost:8080/activities`, formData)
    }

    delete(id: number): Observable<DeleteActivityDtoRes> {
        return this.http.delete<DeleteActivityDtoRes>(`http://localhost:8080/activities/${id}`)
    }

    getLastTwoEvent(): Observable<GetAllActivityDtoRes> {
        return this.http.get<GetAllActivityDtoRes>('http://localhost:8080/activities/last-two-event')
    }

    getLastTwoCourse(): Observable<GetAllActivityDtoRes> {
        return this.http.get<GetAllActivityDtoRes>('http://localhost:8080/activities/last-two-course')
    }
}