import { CentroCusto } from './../../../../models/centro-custo.model';
import { CentroCustoService } from './../../../../services/centro-custo.service';
import { PropostaService } from './../../../../services/proposta.service';
import { DemandaService } from 'src/app/services/demanda.service';
import { Router } from '@angular/router';
import { Component, OnInit,  } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ScrollSpyService } from 'ng-spy';



@Component({
  selector: 'app-tela-corrida',
  templateUrl: './tela-corrida.component.html',
  styleUrls: ['./tela-corrida.component.scss'],
})
export class TelaCorridaComponent implements OnInit {
  aparecerProposta = false;
  centrosCusto: CentroCusto[] = []
  onSubmitDemanda() {
    if(!this.aparecerProposta){
      this.demandaService.postDemanda().subscribe({
          next: (response) => {
            console.log(response)
          },
          error: (err) => {
            console.error(err)
          }
        })
    }else{
      this.propostaService.postProposta().subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (err) => {
          console.error(err)
        }
      })
    }
  }



  constructor(
    private spyService: ScrollSpyService,
    private router: Router,
    private demandaService: DemandaService,
    private propostaService: PropostaService,
  ) {
    this.startSpy();
    this.tipoExibicaoTela();
  }

  indoPraCima(top: number) {
    this.startSpy();
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    console.log(scrollPosition);
    window.scroll({
      top: top,
      behavior: 'smooth',
    });
  }

  tipoExibicaoTela() {
    if (this.router.url == '/tela-inicial/demanda') {
      this.aparecerProposta = false;
    } else {
      this.aparecerProposta = true;
    }
  }

  startSpy() {
    this.spyService.spy();
  }

  titulosDemanda: any[] = [];


  ngOnInit(): void {
    this.startSpy();
    this.titulosDemanda = [
      {titulo: 'Dados Gerais', id: 'dadosGerais', icon: PrimeIcons.CHART_BAR, color: '#00579d', local: 0},
      {titulo: 'Benefícios', id: 'beneficios', icon: PrimeIcons.DATABASE, color: 'rgb(233, 233, 233)', local: 600},
      {titulo: 'Adicionais', id: 'adicionais', icon: PrimeIcons.CHECK, color: 'rgb(233, 233, 233)', local: 1100},
  ];
  }


}
