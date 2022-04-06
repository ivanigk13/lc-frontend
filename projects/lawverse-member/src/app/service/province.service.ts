import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllProvinceDtoRes } from "../dto/province/get-all-province-dto-res";
import { GetByIdProvinceDtoRes } from "../dto/province/get-by-id-province-dto-res";

@Injectable({
    providedIn : 'root'
})

export class ProvinceService {
    constructor(private http:HttpClient){}

    getAll() : Observable<GetAllProvinceDtoRes> {
        return this.http.get<GetAllProvinceDtoRes>('http://localhost:8080/provinces')
    }

    getById(id : number) : Observable<GetByIdProvinceDtoRes> {
        return this.http.get<GetByIdProvinceDtoRes>(`http://localhost:8080/provinces/${id}`)
    }

}