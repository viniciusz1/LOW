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
        console.log(req)
        const authReq = req.clone({
            headers: req.headers.set('withCredentials', 'true')
          });
          

        return next.handle(authReq);
    }
}