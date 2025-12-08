// import {HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import { TokenService } from '../token/token.service';

// export function httpTokenIntercepter(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//   // const token = this.tokenService.token;
//   const token = 'eyJhbGciOiJIUzM4NCJ9.eyJmdWxsbmFtZSI6IkpvaG4iLCJzdWIiOiJuZXplci5wYXNoYXlldkBtYWlsLmNvbSIsImlhdCI6MTc2NTA0ODA0NywiZXhwIjoxNzY1MDU1MjQ3LCJhdXRob3JpdGllcyI6W119.alSNBqecdVbG5Z_f8j4YDs1sJdL6x8qbq_4O7_S1RkvpeaO23SZJZaZFHh0PfiXZ';
//   if (token) {
//     const authReq = request.clone({
//       headers: new HttpHeaders({
//         Authorization: `Bearer ${token}`
//       })
//     });
//     return next(authReq);
//   }
//   return next(request);
// }


import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

export const httpTokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
const router = inject(Router);
  const authReq = request.clone({
    withCredentials: true
  });

  // return next(authReq);
    return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // detect expired token from backend
      if (error.status === 401 && error.error === "TOKEN_EXPIRED") {

        // store the URL the user tried to access
        sessionStorage.setItem("returnUrl", router.url);

        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};

// export const httpTokenInterceptor: HttpInterceptorFn = (
//   request: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<unknown>> => {

//   const tokenService = inject(TokenService);
//   const token = tokenService.token; // get token

//   if (token) {
//     const authReq = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       },
//       // withCredentials: true
//     });
//     return next(authReq);
//   }

//   return next(request);
// };


