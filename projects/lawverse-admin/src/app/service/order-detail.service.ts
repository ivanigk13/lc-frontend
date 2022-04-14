import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllOrderDetailDtoRes } from "../dto/order-detail/get-all-order-detail-dto-res";
import { GetByIdOrderDetailDtoRes } from "../dto/order-detail/get-by-id-order-detail-dto-res";
import { GetParticipantDtoRes } from "../dto/order-detail/get-participant-dto-res";
import { InsertOrderDetailDtoReq } from "../dto/order-detail/insert-order-detail-dto-req";
import { InsertOrderDetailDtoRes } from "../dto/order-detail/insert-order-detail-dto-res";

@Injectable({
    providedIn: 'root'
})

export class OrderDetailService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllOrderDetailDtoRes> {
        return this.http.get<GetAllOrderDetailDtoRes>('http://localhost:8080/order-details')
    }

    getByOrderId(id: string): Observable<GetByIdOrderDetailDtoRes> {
        return this.http.get<GetByIdOrderDetailDtoRes>(`http://localhost:8080/order-details/order/${id}`)
    }

    getById(id: string): Observable<GetByIdOrderDetailDtoRes> {
        return this.http.get<GetByIdOrderDetailDtoRes>(`http://localhost:8080/order-details/${id}`)
    }

    getParticipant(): Observable<GetParticipantDtoRes> {
        return this.http.get<GetParticipantDtoRes>('http://localhost:8080/order-details/activity')
    }

    getIncome(): Observable<GetParticipantDtoRes> {
        return this.http.get<GetParticipantDtoRes>('http://localhost:8080/order-details/activity-income')
    }

    insert(insertOrderDetailDtoReq: InsertOrderDetailDtoReq): Observable<InsertOrderDetailDtoRes> {
        return this.http.post<InsertOrderDetailDtoRes>('http://localhost:8080/order-details', insertOrderDetailDtoReq)
    }
}