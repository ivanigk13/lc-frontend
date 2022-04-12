import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { GetByIdSocialMediaDtoRes } from "../dto/social-media/get-by-id-social-media-dto-res"
import { InsertSocialMediaDtoReq } from "../dto/social-media/insert-social-media-dto-req"
import { InsertSocialMediaDtoRes } from "../dto/social-media/insert-social-media-dto-res"
import { UpdateSocialMediaDtoReq } from "../dto/social-media/update-social-media-dto-req"
import { UpdateSocialMediaDtoRes } from "../dto/social-media/update-social-media-dto-res"

@Injectable({
    providedIn: 'root'
})

export class SocialMediaService {
    constructor(private http: HttpClient) { }

    getById(id: string): Observable<GetByIdSocialMediaDtoRes> {
        return this.http.get<GetByIdSocialMediaDtoRes>(`http://localhost:8080/social-medias/${id}`)
    }

    insert(insertSocialMediaDtoReq: InsertSocialMediaDtoReq): Observable<InsertSocialMediaDtoRes> {
        return this.http.post<InsertSocialMediaDtoRes>('http://localhost:8080/social-medias', insertSocialMediaDtoReq)
    }

    update(updateSocialMediaDtoReq: UpdateSocialMediaDtoReq): Observable<UpdateSocialMediaDtoRes> {
        return this.http.put<UpdateSocialMediaDtoRes>(`http://localhost:8080/social-medias`, updateSocialMediaDtoReq)
    }

    getByUserId(id: string): Observable<GetByIdSocialMediaDtoRes> {
        return this.http.get<GetByIdSocialMediaDtoRes>(`http://localhost:8080/social-medias/user/${id}`)
    }
}