import { JoyrideService } from 'ngx-joyride';
import { Component, OnInit } from '@angular/core';

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

  constructor(private joyrideService: JoyrideService) { }

  ngOnInit(): void {
  }
  
  //Função que inicia o tutorial do sistema. Nela são passadas as fases do tour, e os respectivos nomes das fases em formato de lista com strings
  iniciarTutorial() {
    this.joyrideService.startTour(
      {
        steps: ['bv@tela-inicial', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito@tela-inicial/reunioes', 'nove', 'dez'],
      }
    );
  }
}
