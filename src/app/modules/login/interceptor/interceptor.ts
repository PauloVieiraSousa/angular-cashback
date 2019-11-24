import {Injectable, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../service/token.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService){ }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getAccessToken();
    const cloneRequest = (token) ? request.clone({
        headers: request.headers.set('Authorization', ('Bearer ' + token))
      }) : request.clone();

    return next.handle(cloneRequest);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    }
  ]
})
export class Interceptor {}
