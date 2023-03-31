import { HttpClient } from '@angular/common/http';
import { NivelAcesso } from './../models/nivel-acesso.enum';
import { DemandaAnalista } from 'src/app/models/demanda-analista.model';
import { Injectable } from '@angular/core';
import { path } from './path/rota-api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient){

  }

  private nivelAcesso: NivelAcesso = NivelAcesso.Analista;

  setRole(role: NivelAcesso) {
    this.nivelAcesso = role;
  }

  getRole() {
    return this.nivelAcesso;
  }

  autenticar(usuario: string, senha: string){

    const config = {
      withCredentials: true
  }

    return this.http.post(path + "login/auth", {
      "usuarioUsuario": usuario,
      "senhaUsuario": senha
    }, config)
  }
}
