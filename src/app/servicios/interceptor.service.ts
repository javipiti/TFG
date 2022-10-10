import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router, private api: ApiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken')

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }

      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          if (refreshToken) {
            this.api.refreshToken(refreshToken).subscribe(data => {
            }, err => {
              localStorage.clear();
              this.router.navigateByUrl('/login');
            })
          } else {
            localStorage.clear();
            this.router.navigateByUrl('/login');
          }
        }

        if (err.status === 401) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }
        return throwError(err);
      })
    );
  }
}
