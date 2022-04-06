import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteCityDtoRes } from "../dto/city/delete-city-dto-res";
import { GetAllCityDtoRes } from "../dto/city/get-all-city-dto-res";
import { GetByIdCityDtoRes } from "../dto/city/get-by-id-city-dto-res";
import { InsertCityDtoReq } from "../dto/city/insert-city-dto-req";
import { InsertCityDtoRes } from "../dto/city/insert-city-dto-res";
import { UpdateCityDtoReq } from "../dto/city/update-city-dto-req";
import { UpdateCityDtoRes } from "../dto/city/update-city-dto-res";

@Injectable({
    providedIn : 'root'
})

export class CityService {
    constructor(private http:HttpClient){}

    getAll() : Observable<GetAllCityDtoRes> {
        return this.http.get<GetAllCityDtoRes>('http://localhost:8080/cities')
    }

    getById(id : number) : Observable<GetByIdCityDtoRes> {
        return this.http.get<GetByIdCityDtoRes>(`http://localhost:8080/cities/${id}`)
    }

    insert(insertCityDtoReq : InsertCityDtoReq) : Observable<InsertCityDtoRes> {
        return this.http.post<InsertCityDtoRes>('http://localhost:8080/cities',insertCityDtoReq)
    }

    update(updateCityDtoReq : UpdateCityDtoReq) : Observable<UpdateCityDtoRes> {
        return this.http.put<UpdateCityDtoRes>(`http://localhost:8080/cities`,updateCityDtoReq)
    }

    delete(id : number) : Observable<DeleteCityDtoRes> {
        return this.http.delete<DeleteCityDtoRes>(`http://localhost:8080/cities/${id}`)
    }
}