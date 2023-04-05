import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class LogInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): 
      Observable<HttpEvent<any>> {
        
        req = req.clone({
          withCredentials: true
        });
          

        return next.handle(req);
    }
}