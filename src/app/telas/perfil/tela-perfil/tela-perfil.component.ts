import { JoyrideService } from 'ngx-joyride';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss']
})
export class TelaPerfilComponent implements OnInit {

  constructor(private joyrideService: JoyrideService,
    private usuarioService: UsuarioService) { }
  usuario: Usuario | undefined
  ngOnInit(): void {
    this.usuario = this.usuarioService.getUser('user')
  }

  numberPassword: number = 0;

  defineQuantidadeSenha(){
    const regex = /[a-zA-Z]/g;
    const matches = this.usuario?.senhaUsuario.match(regex);
    this.numberPassword = matches ? matches.length : 0;
  }

  onClick() {
    this.joyrideService.startTour(
      {
        steps: ['bv@tela-inicial', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete'],
      }
    );
  }

}
