import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { tap } from "rxjs";
import { LoginService } from "../service/login.service";

@Injectable()

export class HttpHandlerAsset implements HttpInterceptor{

    constructor(private loginService : LoginService, private messageService : MessageService,
                private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.loginService.getData()?.token
        const reqClone = req.clone(
            {setHeaders : 
                {'Authorization' : `Bearer ${token}`}
            }
        )
        return next.handle(reqClone).pipe(
            tap({
                next: data => {
                    if(data instanceof HttpResponse) {
                        if(data.body.msg){ 
                            this.messageService.add({
                                severity:'success',
                                summary:'You succeed',
                                detail: data.body.msg
                            })
                        }                        
                    }
                },
                error: err => {
                    if(err instanceof HttpErrorResponse) {
                        this.messageService.add({
                            severity:'error',
                            summary:'Something is wrong',
                            detail: err.error.msg
                        })
                        if(err.status == 401 && this.router.url != '/login'){
                            localStorage.clear()
                            this.router.navigateByUrl('/login')
                        }
                    }
                }
            })
        )
    }

}