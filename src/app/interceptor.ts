import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    req = req.clone({
      withCredentials: true
    });
    console.log(next)
    console.log(req)


    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              alert('Unauthorized access!')
              this.router.navigate(['/login'])
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            alert('Unauthorized access!')
            this.router.navigate(['/login'])
          }
        }
      }));
  }
}