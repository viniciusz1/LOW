import { CentroCusto } from './../../../../models/centro-custo.model';
import { CentroCustoService } from './../../../../services/centro-custo.service';
import { PropostaService } from './../../../../services/proposta.service';
import { DemandaService } from 'src/app/services/demanda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit,  } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ScrollSpyService } from 'ng-spy';
import { DemandaAnalista } from 'src/app/models/demanda-analista.model';
import { DemandaAnalistaService } from 'src/app/services/demanda-analista.service';
import { Demanda } from 'src/app/models/demanda.model';



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

  codigoDemandaRota = this.activatedRoute.snapshot.params['codigoDemanda'];

  constructor(
    private spyService: ScrollSpyService,
    private router: Router,
    private demandaService: DemandaService,
    private demandaAnalistaService: DemandaAnalistaService,
    private propostaService: PropostaService,
    private activatedRoute: ActivatedRoute
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
    window.scroll({
      top: top,
      behavior: 'smooth',
    });
  }

  tipoExibicaoTela() {
    if (this.router.url == '/tela-inicial/demanda') {
      this.aparecerProposta = false;
      this.demandaService.resetDemandaForm()
    } else {
      this.aparecerProposta = true;
      this.demandaService.resetDemandaForm()
      this.getDemandaAnalistaByCodigoDemanda()
    }
  }

  dadosDemandaAnalista: DemandaAnalista | undefined

  getDemandaAnalistaByCodigoDemanda(){
    this.demandaAnalistaService.getDemandaAnalistaByCodigoDemanda(this.codigoDemandaRota)
    .subscribe(e => {
      this.dadosDemandaAnalista = e
      console.log(this.dadosDemandaAnalista)
      if(this.dadosDemandaAnalista?.demandaDemandaAnalista)
      this.demandaService.demandaForm.patchValue({
        tituloDemanda: this.dadosDemandaAnalista?.demandaDemandaAnalista.tituloDemanda,
        situacaoAtualDemanda: this.dadosDemandaAnalista.demandaDemandaAnalista.situacaoAtualDemanda,

        objetivoDemanda: this.dadosDemandaAnalista?.demandaDemandaAnalista.objetivoDemanda,
        beneficioRealDemanda: {
          moedaBeneficio: this.dadosDemandaAnalista?.demandaDemandaAnalista.beneficioRealDemanda?.moedaBeneficio,
          memoriaDeCalculoBeneficio: this.dadosDemandaAnalista?.demandaDemandaAnalista.beneficioRealDemanda?.memoriaDeCalculoBeneficio,
          valorBeneficio: this.dadosDemandaAnalista?.demandaDemandaAnalista.beneficioRealDemanda?.valorBeneficio.toString()
        },
        beneficioPotencialDemanda: {
          moedaBeneficio: this.dadosDemandaAnalista?.demandaDemandaAnalista.beneficioRealDemanda?.moedaBeneficio,
          memoriaDeCalculoBeneficio: this.dadosDemandaAnalista?.demandaDemandaAnalista.beneficioRealDemanda?.memoriaDeCalculoBeneficio,
          valorBeneficio: this.dadosDemandaAnalista?.demandaDemandaAnalista.beneficioRealDemanda?.valorBeneficio.toString()
        },
        beneficioQualitativoDemanda: this.dadosDemandaAnalista.demandaDemandaAnalista.beneficioQualitativoDemanda,
        frequenciaDeUsoDemanda: this.dadosDemandaAnalista.demandaDemandaAnalista.frequenciaDeUsoSistemaDemanda,
      })
      // this.demandaService.arquivos = this.dadosDemandaAnalista.demandaDemandaAnalista?.arquivosDemanda
      this.demandaService.demandaForm.disable()
    })
  }

  startSpy() {
    this.spyService.spy();
  }

  titulosDemanda: any[] = [];


  ngOnInit(): void {
    this.startSpy();
    setInterval(() => {
       let icones = document.getElementsByClassName('nav-scroll');
       for(let i = 0; i < icones.length; i++){
        if(icones[i].classList.length > 2){
          this.titulosDemanda[i].color="#00579d"
        } else {
          this.titulosDemanda[i].color="rgb(233, 233, 233)"
        }
      }
    })

    this.titulosDemanda = [
      {titulo: 'Dados Gerais', id: 'dadosGerais', icon: PrimeIcons.CHART_BAR, color: 'rgb(233, 233, 233)', local: 0},
      {titulo: 'Benefícios', id: 'beneficios', icon: PrimeIcons.DATABASE, color: 'rgb(233, 233, 233)', local: 600},
      {titulo: 'Adicionais', id: 'adicionais', icon: PrimeIcons.CHECK, color: 'rgb(233, 233, 233)', local: 1100},
  ];
  }


}
