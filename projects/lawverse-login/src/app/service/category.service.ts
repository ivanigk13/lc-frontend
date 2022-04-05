import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { DeleteCategoryDtoRes } from "../dto/category/delete-category-dto-res"
import { GetAllCategoryDtoRes } from "../dto/category/get-all-category-dto-res"
import { GetByIdCategoryDtoRes } from "../dto/category/get-by-id-category-dto-res"
import { InsertCategoryDtoReq } from "../dto/category/insert-category-dto-req"
import { InsertCategoryDtoRes } from "../dto/category/insert-category-dto-res"
import { UpdateCategoryDtoReq } from "../dto/category/update-category-dto-req"
import { UpdateCategoryDtoRes } from "../dto/category/update-category-dto-res"

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<GetAllCategoryDtoRes> {
        return this.http.get<GetAllCategoryDtoRes>(`http://localhost:8080/categories`)
    }

    getById(id: string): Observable<GetByIdCategoryDtoRes> {
        return this.http.get<GetByIdCategoryDtoRes>(`http://localhost:8080/categories/${id}`)
    }

    insert(category: InsertCategoryDtoReq): Observable<InsertCategoryDtoRes> {
        return this.http.post<InsertCategoryDtoRes>('http://localhost:8080/categories', category)
    }

    update(category: UpdateCategoryDtoReq): Observable<UpdateCategoryDtoRes> {
        return this.http.put<UpdateCategoryDtoRes>(`http://localhost:8080/categories`, category)
    }

    deleteById(id: string): Observable<DeleteCategoryDtoRes> {
        return this.http.delete<DeleteCategoryDtoRes>(`http://localhost:8080/categories/${id}`)
    }
}