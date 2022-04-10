import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllTransactionStatusDtoRes } from "../dto/transaction-status/get-all-transaction-status-dto-res";
import { GetByIdTransactionStatusDtoRes } from "../dto/transaction-status/get-by-id-transaction-status-dto-res";

@Injectable({
    providedIn: 'root'
})

export class TransactionStatusService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllTransactionStatusDtoRes> {
        return this.http.get<GetAllTransactionStatusDtoRes>('http://localhost:8080/transaction-statuses')
    }

    getById(id: string): Observable<GetByIdTransactionStatusDtoRes> {
        return this.http.get<GetByIdTransactionStatusDtoRes>(`http://localhost:8080/transaction-statuses/${id}`)
    }

    getApproveId(): Observable<string> {
        return this.http.get<string>('http://localhost:8080/transaction-statuses/approve')
    }

    getRejectId(): Observable<string> {
        return this.http.get<string>('http://localhost:8080/transaction-statuses/reject')
    }
}