import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteIndustryDtoRes } from "../dto/industry/delete-industry-dto-res";
import { GetAllIndustryDtoRes } from "../dto/industry/get-all-industry-dto-res";
import { GetByIdIndustryDtoRes } from "../dto/industry/get-by-id-industry-dto-res";
import { InsertIndustryDtoReq } from "../dto/industry/insert-industry-dto-req";
import { InsertIndustryDtoRes } from "../dto/industry/insert-industry-dto-res";
import { UpdateIndustryDtoReq } from "../dto/industry/update-industry-dto-req";
import { UpdateIndustryDtoRes } from "../dto/industry/update-industry-dto-res";

@Injectable({
    providedIn : 'root'
})

export class IndustryService {
    constructor(private http:HttpClient){}

    getAll() : Observable<GetAllIndustryDtoRes> {
        return this.http.get<GetAllIndustryDtoRes>('http://localhost:8080/industries')
    }

    getById(id : number) : Observable<GetByIdIndustryDtoRes> {
        return this.http.get<GetByIdIndustryDtoRes>(`http://localhost:8080/industries/${id}`)
    }

    insert(insertIndustryDtoReq : InsertIndustryDtoReq) : Observable<InsertIndustryDtoRes> {
        return this.http.post<InsertIndustryDtoRes>('http://localhost:8080/industries',insertIndustryDtoReq)
    }

    update(updateIndustryDtoReq : UpdateIndustryDtoReq) : Observable<UpdateIndustryDtoRes> {
        return this.http.put<UpdateIndustryDtoRes>(`http://localhost:8080/industries`,updateIndustryDtoReq)
    }

    delete(id : number) : Observable<DeleteIndustryDtoRes> {
        return this.http.delete<DeleteIndustryDtoRes>(`http://localhost:8080/industries/${id}`)
    }
}