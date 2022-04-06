import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteSubscribeDtoRes } from "../dto/subscribe/delete-subscribe-dto-res";
import { GetAllSubscribeDtoRes } from "../dto/subscribe/get-all-subscribe-dto-res";
import { GetByIdSubscribeDtoRes } from "../dto/subscribe/get-by-id-subscribe-dto-res";
import { InsertSubscribeDtoReq } from "../dto/subscribe/insert-subscribe-dto-req";
import { InsertSubscribeDtoRes } from "../dto/subscribe/insert-subscribe-dto-res";
import { UpdateSubscribeDtoReq } from "../dto/subscribe/update-subscribe-dto-req";
import { UpdateSubscribeDtoRes } from "../dto/subscribe/update-subscribe-dto-res";


@Injectable({
    providedIn: 'root'
})
export class SubscribeService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllSubscribeDtoRes> {
        return this.http.get<GetAllSubscribeDtoRes>('http://localhost:8080/subscribes')
    }

    getById(id: number): Observable<GetByIdSubscribeDtoRes> {
        return this.http.get<GetByIdSubscribeDtoRes>(`http://localhost:8080/subscribes/${id}`)
    }

    insert(insertSubscribeDtoReq: InsertSubscribeDtoReq): Observable<InsertSubscribeDtoRes> {
        return this.http.post<InsertSubscribeDtoRes>('http://localhost:8080/subscribes', insertSubscribeDtoReq)
    }

    update(updateSubscribeDtoReq: UpdateSubscribeDtoReq): Observable<UpdateSubscribeDtoRes> {
        return this.http.put<UpdateSubscribeDtoRes>(`http://localhost:8080/subscribes`, updateSubscribeDtoReq)
    }

    delete(id: number): Observable<DeleteSubscribeDtoRes> {
        return this.http.delete<DeleteSubscribeDtoRes>(`http://localhost:8080/subscribes/${id}`)
    }
}