import { PermissoesDeRotas } from './permissoes';
import { path } from './../services/path/rota-api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/userDetails.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationChildGuard implements CanActivateChild {
  permissoes = PermissoesDeRotas
  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.http.get<UserDetails>(path + "login/verify-token").subscribe({
      next: userDetails => {
        // console.log(state.url)
        
        for(let permissao of this.permissoes){

          if(state.url.startsWith(permissao.path)){
            console.log("Permissão: " + permissao.path)
            if(permissao.authorities.includes(userDetails.usuario.nivelAcessoUsuario)){
              return true;
            }else if(permissao.authorities.includes("*")){
              return true;
            }else{
              this.showError("Você não tem permissão para acessar essa rota")
              this.router.navigate(['/tela-inicial'])
              return false;
            }
          }
        }
        return false;
      }, error: err => {
        this.showError("Erro")
        return false;
      },
    })
    return true;
  }

  
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
