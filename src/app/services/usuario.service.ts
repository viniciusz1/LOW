import { HttpClient } from '@angular/common/http';
import { NivelAcesso } from './../models/nivel-acesso.enum';
import { DemandaAnalista } from 'src/app/models/demanda-analista.model';
import { Injectable } from '@angular/core';
import { path } from './path/rota-api';
import { Usuario } from '../models/usuario.model';
import { UserDetails } from '../models/userDetails.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient,) {

    let user = this.getUser('user')
    this.nivelAcesso = user?.nivelAcessoUsuario
  }

  private nivelAcesso: string | undefined = NivelAcesso.Analista;

  usuario: Usuario | undefined

  set setRole(role: NivelAcesso) {
    this.nivelAcesso = role;
  }

  get getRole() {
    let user = this.getUser('user')
        return user?.nivelAcessoUsuario;
  }
  // /login/return-user-logged
  // let user = this.http.get<Usuario>(path + " /login/return-user-logged")
  //   .subscribe(user => {
  //     if (user) {
  //       return user

  //     }
  //     return undefined
  //   })
  // return user
  get getDepartamento() {
    let user = this.getUser('user')
        return user?.departamentoUsuario.nomeDepartamento;
  }

  //Não deve de jeito nenhum retornar 0, verificar isso posteriormente
  getCodigoUser(): number {
    try {
      let user = this.getUser('user')
      if (user?.codigoUsuario)
        return user?.codigoUsuario
      return 0
    } catch (err) {
      return 0
    }
  }
  verificarTokenUserDetailsReturn(){
    return this.http.get<UserDetails>(path + "login/verify-token")
  }

  setUser(usuario: Usuario) {
    this.usuario = usuario
    localStorage.setItem("user", JSON.stringify(usuario))
  }

  getUser(key: string): Usuario | undefined {


    let user = localStorage.getItem(key)
    if (user) {
      return JSON.parse(user)
    }
    // throw Error("Usuario não encontrado")
    return undefined
  }

  autenticar(usuario: string, senha: string) {
    return this.http.post<Usuario>(path + "login/auth", {
      "usuarioUsuario": usuario,
      "senhaUsuario": senha
    })
  }

  logout(){
    return this.http.get<String>(path + "logout")
  }
}
