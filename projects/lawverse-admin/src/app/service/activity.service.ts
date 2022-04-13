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
import { UpdateActivityTransactionStatusDtoDataRes } from "../dto/activity/update-activity-transaction-status-dto-data-res";
import { UpdateActivityTransactionStatusDtoReq } from "../dto/activity/update-activity-transaction-status-dto-req";
import { UpdateActivityTransactionStatusDtoRes } from "../dto/activity/update-activity-transaction-status-dto-res";

@Injectable({
    providedIn: 'root'
})

export class ActivityService {
    constructor(private http: HttpClient) { }

    getAll(start:number, max:number, query?:string): Observable<GetAllActivityDtoRes> {
        if(!query){
            return this.http.get<GetAllActivityDtoRes>(`http://localhost:8080/activities?start=${start}&max=${max}`)
        }else{
            return this.http.get<GetAllActivityDtoRes>(`http://localhost:8080/activities?start=${start}&max=${max}&query=${query}`)
        }
    }

    getAllEvent(): Observable<GetAllActivityDtoRes> {
        return this.http.get<GetAllActivityDtoRes>('http://localhost:8080/activities/approved-event')
    }

    getAllCourse(): Observable<GetAllActivityDtoRes> {
        return this.http.get<GetAllActivityDtoRes>('http://localhost:8080/activities/approved-course')
    }

    getAllActivityPending(start?:number, max?:number): Observable<GetAllActivityDtoRes> {
        if(!start && !max) {
            return this.http.get<GetAllActivityDtoRes>('http://localhost:8080/activities/pending')
        }else{
            return this.http.get<GetAllActivityDtoRes>(`http://localhost:8080/activities/pending?start=${start}&max=${max}`)
        }
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

    updateApprove(updateActivityReq: UpdateActivityTransactionStatusDtoReq): Observable<UpdateActivityTransactionStatusDtoRes> {
        return this.http.put<UpdateActivityTransactionStatusDtoRes>(`http://localhost:8080/activities/approve`, updateActivityReq)
    }

    updateReject(updateActivityReq: UpdateActivityTransactionStatusDtoReq): Observable<UpdateActivityTransactionStatusDtoRes> {
        return this.http.put<UpdateActivityTransactionStatusDtoRes>(`http://localhost:8080/activities/reject`, updateActivityReq)
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