import { PermissoesDeRotas } from './permissoes';
import { path } from './../services/path/rota-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/userDetails.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationChildGuard implements CanActivateChild {
  permissoes = PermissoesDeRotas
  constructor(private http: HttpClient, private router: Router) {

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.http.get<UserDetails>(path + "login/verify-token").subscribe({
      next: userDetails => {
        let rota = this.permissoes.find(e => e.path.startsWith(state.url))
        if (rota) {
          for (let nivelAcesso of rota.authorities) {
            if (nivelAcesso == userDetails.usuario.nivelAcessoUsuario) {
              return true;
            } else if (nivelAcesso == "*") {
              return true;
            }
          }
        } else {
          alert("Rota não encontrada")
          this.router.navigate([''])
        }
        alert("Você não tem permissão para acessar esta rota!")
        this.router.navigate([''])
        return false;
      }, error: err => {
        alert(err)
        this.router.navigate([''])
        return false;
      },
    })
    return true;
  }
}
