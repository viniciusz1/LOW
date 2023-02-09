import { NivelAcesso } from './../models/nivel-acesso.enum';
import { DemandaAnalista } from 'src/app/models/demanda-analista.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private nivelAcesso: NivelAcesso = NivelAcesso.Analista;

  setRole(role: NivelAcesso) {
    this.nivelAcesso = role;
  }

  getRole() {
    return this.nivelAcesso;
  }
}
