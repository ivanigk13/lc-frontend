import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteTransactionStatusDtoRes } from "../dto/transaction-status/delete-transaction-status-dto-res";
import { GetAllTransactionStatusDtoRes } from "../dto/transaction-status/get-all-transaction-status-dto-res";
import { GetByIdTransactionStatusDtoRes } from "../dto/transaction-status/get-by-id-transaction-status-dto-res";
import { InsertTransactionStatusDtoReq } from "../dto/transaction-status/insert-transaction-status-dto-req";
import { InsertTransactionStatusDtoRes } from "../dto/transaction-status/insert-transaction-status-dto-res";
import { UpdateTransactionStatusDtoReq } from "../dto/transaction-status/update-transaction-status-dto-req";
import { UpdateTransactionStatusDtoRes } from "../dto/transaction-status/update-transaction-status-dto-res";

@Injectable({
    providedIn: 'root'
})

export class TransactionStatusService {
    constructor(private http: HttpClient) { }

    getAll(start?:number, max?:number,query?:string): Observable<GetAllTransactionStatusDtoRes> {
        if(!start && !max){
            return this.http.get<GetAllTransactionStatusDtoRes>(`http://localhost:8080/transaction-statuses`)
        }else{
            if(!query){
                return this.http.get<GetAllTransactionStatusDtoRes>(`http://localhost:8080/transaction-statuses?start=${start}&max=${max}`)
            }else{
                return this.http.get<GetAllTransactionStatusDtoRes>(`http://localhost:8080/transaction-statuses?query=${query}&start=${start}&max=${max}`)
            }
        }
    }

    getById(id: string): Observable<GetByIdTransactionStatusDtoRes> {
        return this.http.get<GetByIdTransactionStatusDtoRes>(`http://localhost:8080/transaction-statuses/${id}`)
    }

    insert(insert: InsertTransactionStatusDtoReq): Observable<InsertTransactionStatusDtoRes> {
        return this.http.post<InsertTransactionStatusDtoRes>('http://localhost:8080/transaction-statuses', insert)
    }

    update(update: UpdateTransactionStatusDtoReq): Observable<UpdateTransactionStatusDtoRes> {
        return this.http.put<UpdateTransactionStatusDtoRes>('http://localhost:8080/transaction-statuses', update)
    }

    delete(id: string): Observable<DeleteTransactionStatusDtoRes> {
        return this.http.delete<DeleteTransactionStatusDtoRes>(`http://localhost:8080/transaction-statuses/${id}`)
    }
}