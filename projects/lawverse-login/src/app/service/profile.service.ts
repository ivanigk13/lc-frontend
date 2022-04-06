import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteProfileDtoRes } from "../dto/profile/delete-profile-dto-res";
import { GetAllProfileDtoRes } from "../dto/profile/get-all-profile-dto-res";
import { GetByIdProfileDtoRes } from "../dto/profile/get-by-id-profile-dto-res";
import { InsertProfileDtoReq } from "../dto/profile/insert-profile-dto-req";
import { InsertProfileDtoRes } from "../dto/profile/insert-profile-dto-res";
import { UpdateProfileDtoReq } from "../dto/profile/update-profile-dto-req";
import { UpdateProfileDtoRes } from "../dto/profile/update-profile-dto-res";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllProfileDtoRes> {
        return this.http.get<GetAllProfileDtoRes>('http://localhost:8080/profiles')
    }

    getById(id: number): Observable<GetByIdProfileDtoRes> {
        return this.http.get<GetByIdProfileDtoRes>(`http://localhost:8080/profiles/${id}`)
    }

    insert(insertProfileDtoReq: InsertProfileDtoReq): Observable<InsertProfileDtoRes> {
        return this.http.post<InsertProfileDtoRes>('http://localhost:8080/profiles', insertProfileDtoReq)
    }

    update(updateProfileDtoReq: UpdateProfileDtoReq, file?: File): Observable<UpdateProfileDtoRes> {
        const formData: FormData = new FormData()
        formData.append('data', JSON.stringify(updateProfileDtoReq))
        if (file) formData.append('file', file)
        return this.http.put<UpdateProfileDtoRes>(`http://localhost:8080/profiles`, formData)
    }

    delete(id: number): Observable<DeleteProfileDtoRes> {
        return this.http.delete<DeleteProfileDtoRes>(`http://localhost:8080/profiles/${id}`)
    }
}