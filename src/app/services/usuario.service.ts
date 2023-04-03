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

  get getCodigoUser(): number {
    if (this.usuario){
      return this.usuario?.codigoUsuario
    }
    throw Error("Usuario não encontrado")
  }

  setUser(usuario: Usuario) {
    this.usuario = usuario
    localStorage.setItem("user", JSON.stringify(usuario))
  }

  getUser(key: string) {
    return localStorage.getItem(key)
  }

  autenticar(usuario: string, senha: string) {
    return this.http.post<Usuario>(path + "login/auth", {
      "usuarioUsuario": usuario,
      "senhaUsuario": senha
    })
  }
}
