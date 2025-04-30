import {HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
// import { TokenService } from '../token/token.service';

export function httpTokenIntercepter(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  // const token = this.tokenService.token;
  const token = 'eyJhbGciOiJIUzM4NCJ9.eyJmdWxsbmFtZSI6IkpvaG4iLCJzdWIiOiJqb2huQG1haWwuY29tIiwiaWF0IjoxNzQ0MjMzNDg4LCJleHAiOjE3NDQyNDA2ODgsImF1dGhvcml0aWVzIjpbXX0.btXBoLZN9L2Z82epiu3uq7-QUG6pxj3_bh0ifcN2IFlrbHbm2SWkd01bwxgv0n0y';
  if (token) {
    const authReq = request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
    return next(authReq);
  }
  return next(request);
}

