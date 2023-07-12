import { JoyrideService } from 'ngx-joyride';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-escopo-perfil',
  templateUrl: './escopo-perfil.component.html',
  styleUrls: ['./escopo-perfil.component.scss']
})

/*
  Componente utilizado para fazer o escopo da parte onde ficam as configurações de perfil,
  Logo, deixa um menu lateral com as opções da tela de configurações

*/

export class EscopoPerfilComponent implements OnInit {

  constructor(private joyrideService: JoyrideService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }
  
  //Função que inicia o tutorial do sistema. Nela são passadas as fases do tour, e os respectivos nomes das fases em formato de lista com strings
  iniciarTutorial() {
    if(this.usuarioService.getRole == "Solicitante" || this.usuarioService.getRole == "GerenteNegocio"){
      this.joyrideService.startTour(
        {
          steps: ['bv@tela-inicial', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete'],
        }
      );
    }else{
      this.joyrideService.startTour(
        {
          steps: ['bv@tela-inicial', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito@tela-inicial/reunioes', 'nove', 'dez'],
        }
      );
    }

  }
}
