import { path } from './../services/path/rota-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationChildGuard implements CanActivateChild {
  constructor(private http: HttpClient) {

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.http.get(path + "login/verify-token").subscribe({
      next(value) {
        console.log(value)
      }, error(err) {
        console.log(err)
      },
    })
    return true;
  }
}
