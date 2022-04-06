import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllOrderDtoRes } from "../dto/order/get-all-order-dto-res";
import { GetByIdOrderDtoRes } from "../dto/order/get-by-id-order-dto-res";
import { GetByUserIdOrderDtoRes } from "../dto/order/get-by-user-id-order-dto-res";
import { InsertOrderDtoReq } from "../dto/order/insert-order-dto-req";
import { InsertOrderDtoRes } from "../dto/order/insert-order-dto-res";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllOrderDtoRes> {
        return this.http.get<GetAllOrderDtoRes>('http://localhost:8080/orders')
    }

    getByUserId(id: string): Observable<GetByUserIdOrderDtoRes> {
        return this.http.get<GetByUserIdOrderDtoRes>(`http://localhost:8080/orders/user/${id}`)
    }

    getById(id: string): Observable<GetByIdOrderDtoRes> {
        return this.http.get<GetByIdOrderDtoRes>(`http://localhost:8080/orders/${id}`)
    }

    insert(insertOrderDtoReq: InsertOrderDtoReq, file: File): Observable<InsertOrderDtoRes> {
        const formData: FormData = new FormData()
        formData.append('data', JSON.stringify(insertOrderDtoReq))
        if (file) formData.append('file', file)        
        return this.http.post<InsertOrderDtoRes>('http://localhost:8080/orders', formData)
    }
}