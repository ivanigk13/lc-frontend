import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { DeleteRoleDtoRes } from "../dto/role/delete-role-dto-res"
import { GetAllRoleDtoRes } from "../dto/role/get-all-role-dto-res"
import { GetByIdRoleDtoRes } from "../dto/role/get-by-id-role-dto-res"
import { InsertRoleDtoReq } from "../dto/role/insert-role-dto-req"
import { InsertRoleDtoRes } from "../dto/role/insert-role-dto-res"
import { UpdateRoleDtoReq } from "../dto/role/update-role-dto-req"
import { UpdateRoleDtoRes } from "../dto/role/update-role-dto-res"

@Injectable({
    providedIn: 'root'
})

export class RoleService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllRoleDtoRes> {
        return this.http.get<GetAllRoleDtoRes>('http://localhost:8080/roles')
    }

    getById(id: string): Observable<GetByIdRoleDtoRes> {
        return this.http.get<GetByIdRoleDtoRes>(`http://localhost:8080/roles/${id}`)
    }

    insert(insertRoleDtoReq: InsertRoleDtoReq): Observable<InsertRoleDtoRes> {
        return this.http.post<InsertRoleDtoRes>('http://localhost:8080/roles', insertRoleDtoReq)
    }

    update(updateRoleDtoReq: UpdateRoleDtoReq): Observable<UpdateRoleDtoRes> {
        return this.http.put<UpdateRoleDtoRes>(`http://localhost:8080/roles`, updateRoleDtoReq)
    }

    delete(id: string): Observable<DeleteRoleDtoRes> {
        return this.http.delete<DeleteRoleDtoRes>(`http://localhost:8080/roles/${id}`)
    }
}