import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessageService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    req = req.clone({
      withCredentials: true
    });


    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              this.showError("Acesso Negado!")
              this.router.navigate(['/login'])
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            this.showError("Acesso Negado!")
            this.router.navigate(['/login'])
          }
        }
      }));
  }

  
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}