import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteUserDtoRes } from "../dto/user/delete-user-dto-res";
import { ForgotPasswordReq } from "../dto/user/forgot-password-dto-req";
import { ForgotPasswordRes } from "../dto/user/forgot-password-dto-res";
import { GetAllUserDtoRes } from "../dto/user/get-all-user-dto-res";
import { GetByIdUserDtoRes } from "../dto/user/get-by-id-user-dto-res";
import { InsertUserDtoReq } from "../dto/user/insert-user-dto-req";
import { InsertUserDtoRes } from "../dto/user/insert-user-dto-res";
import { UpdateUserDtoReq } from "../dto/user/update-user-dto-req";
import { UpdateUserDtoRes } from "../dto/user/update-user-dto-res";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }

    getAll(start?:number, max?:number,query?:string): Observable<GetAllUserDtoRes> {
        if(!start && !max){
            return this.http.get<GetAllUserDtoRes>(`http://localhost:8080/users`)
        }else{
            if(!query){
                return this.http.get<GetAllUserDtoRes>(`http://localhost:8080/users?start=${start}&max=${max}`)
            }else{
                return this.http.get<GetAllUserDtoRes>(`http://localhost:8080/users?query=${query}&start=${start}&max=${max}`)
            }
        }
    }

    getById(id: number): Observable<GetByIdUserDtoRes> {
        return this.http.get<GetByIdUserDtoRes>(`http://localhost:8080/users/${id}`)
    }

    insert(insertUserDtoReq: InsertUserDtoReq): Observable<InsertUserDtoRes> {
        return this.http.post<InsertUserDtoRes>('http://localhost:8080/users', insertUserDtoReq)
    }

    update(updateUserDtoReq: UpdateUserDtoReq): Observable<UpdateUserDtoRes> {
        return this.http.put<UpdateUserDtoRes>(`http://localhost:8080/users`, updateUserDtoReq)
    }

    forgotPassowrd(forgotPasswordReq: ForgotPasswordReq): Observable<ForgotPasswordRes> {
        return this.http.put<ForgotPasswordRes>('http://localhost:8080/users/forgot-password', forgotPasswordReq)
    }

    delete(id: string): Observable<DeleteUserDtoRes> {
        return this.http.delete<DeleteUserDtoRes>(`http://localhost:8080/users/${id}`)
    }
}