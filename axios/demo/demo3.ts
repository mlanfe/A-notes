import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, empty, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private messageService: NzMessageService,
    private readonly injector: Injector
) {
}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers: { [name: string]: string | string[]; } = {};

    const language = localStorage.getItem("language") || "zh";
    request.headers.set('Current-Language', language).set('Accept-Language', 'zh-CN,zh;q=0.8');

    for (const key of request.headers.keys()) {
      headers[key] = request.headers.getAll(key);
    }
    
    // headers['Current-Language'] = language;
    // headers['Accept-Language'] = 'zh-CN,zh;q=0.8'

    

    let token = localStorage.getItem('token');
    if (token) headers['Authorization'] = 'Bearer ' + token;

    var newRequest = request.clone({
      headers: new HttpHeaders(headers)
    })

    return next.handle(newRequest).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          token = res.headers.get('token')
          if (token) {
            localStorage.setItem('token', token);
          }
        }
      }),
      catchError((err, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.router.navigate(['login']);
            localStorage.removeItem('token');
            localStorage.removeItem('userinfo');
            localStorage.removeItem('permissions');
            return empty();
          } else if (err.status == 400) {
            // 错误码是400, 提示后端返回的错误值
            let message = res.error.message || res.error || res.statusText;
            const code: string = JSON.parse(res.error?.errors?.Name[0] || "{}")?.Code;
            if (/\/scada\/scadarest\//.test(request.url) && code) {
                message = code;
            } 
            try {
                const translateService = this.injector.get(TranslateService)
                let errorMsg = translateService.instant(`ErrorInterceptor.${message}`)
                errorMsg = translateService.instant(errorMsg.replace(/LoginFailed[0-9]*/g, 'LoginFailed')); // sdk登录失败code不在中英文包时，替换成LoginFailed
                if (errorMsg.includes("ErrorInterceptor.")) {  // errorMsg不在中英文包时，去掉前缀ErrorInterceptor.
                    errorMsg = errorMsg.replace(/ErrorInterceptor./g, '')
                }

                // 
                this.messageService.error(errorMsg);
            } catch {
                // log without translation translation service is not yet available
            }
        }  else if (err.status === 404) {
            this.messageService.error(`Api 404 occurs when ${request.method} ${request.url}`);
          } else if (err.status === 405) {
              this.messageService.error(`Api 405 occurs when ${request.method} method is not allowed.`);
          } else if (err.status === 500) {
              this.messageService.error(`Api 500 occurs detail ${err.message}`);
              console.error(err.error);
          }
        }
        return throwError(err);
      })
    )
  }
}
