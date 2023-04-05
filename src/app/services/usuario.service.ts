import { HttpClient } from '@angular/common/http';
import { NivelAcesso } from './../models/nivel-acesso.enum';
import { DemandaAnalista } from 'src/app/models/demanda-analista.model';
import { Injectable } from '@angular/core';
import { path } from './path/rota-api';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient,) {

  }

  private nivelAcesso: NivelAcesso = NivelAcesso.Analista;

  usuario: Usuario | undefined

  set setRole(role: NivelAcesso) {
    this.nivelAcesso = role;
  }

  get getRole() {
    return this.nivelAcesso;
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

  setUser(usuario: Usuario) {
    this.usuario = usuario
    localStorage.setItem("user", JSON.stringify(usuario))
  }

  getUser(key: string): Usuario | undefined {
    let user = localStorage.getItem(key)
    if (user) {
      return JSON.parse(user)
    }
    throw Error("Usuario não encontrado")
  }

  autenticar(usuario: string, senha: string) {
    return this.http.post<Usuario>(path + "login/auth", {
      "usuarioUsuario": usuario,
      "senhaUsuario": senha
    })
  }
}
