import { Demanda } from './../../../../models/demanda.model';
import { CentroCusto } from './../../../../models/centro-custo.model';
import { PropostaService } from './../../../../services/proposta.service';
import { DemandaService } from 'src/app/services/demanda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeIcons } from 'primeng/api';
import { RascunhoService } from 'src/app/services/rascunho.service';

interface Tab {
  title: string;
  content: string;
}

@Component({
  selector: 'app-tela-corrida',
  templateUrl: './tela-corrida.component.html',
  styleUrls: ['./tela-corrida.component.scss'],
})
export class TelaCorridaComponent implements OnInit {
  serviceCalled = false;
  aparecerProposta = false;
  centroCustos: CentroCusto[] = [];
  codigoDemandaRota = this.activatedRoute.snapshot.params['codigoDemanda'];
  posicaoScroll = 0;
  titulosDemanda: any[] = [];
  titulosProposta: any[] = [];
  activeSection: string = '';
  activePage: string = '';

  tabs2: Tab[] = [
    { title: 'Aba 1', content: 'Conteúdo da Aba 1' },
    { title: 'Aba 2', content: 'Conteúdo da Aba 2' },
    { title: 'Aba 3', content: 'Conteúdo da Aba 3' }
  ];

  activeIndex = 1;
  dadosDemanda: Demanda | undefined;

  verificaSeTemParecerOuRecomendacao() {
    if (this.dadosDemanda?.parecerComissaoProposta || this.dadosDemanda?.recomendacaoProposta) {
      return true;
    }
    return false;
  }
  beneficioValidator() {
    this.demandaService.beneficioValidator()
  }
  onSubmitDemanda() {
    if (!this.aparecerProposta) {
      if (this.router.url.includes('reformular-demanda')) {
        this.demandaService.reformularDemanda().subscribe({
          next: (response) => {
            this.showSuccess("Demanda reformulada com sucesso!")
            this.router.navigate(['/tela-inicial']);
          },
          error: (err) => {
            this.showError("Não foi possível reformular a demanda!")
          },
        });
      } else {
        this.demandaService.postDemanda().subscribe({
          next: (response) => {
            this.showSuccess("Demanda criada com sucesso!")
            // let codigo = this.route.snapshot.params['indiceRascunho']
            // this.rascunhoService.deleteRascunho(codigo)
            this.router.navigate(['/tela-inicial']);
          },
          error: (err) => {
            console.log("Erro ", err.error);
            if(err.error === "Falta completar as porcentagem de centro de custos"){
              this.showError("Centros de custo está inválido! Verifique se ele se encontra em 100%")
            } else if(err.error === "É necessário preencher todos os campos do benefício Potencial" || err.error === "É necessário preencher todos os campos do benefício Real"){
              this.showError(err.error)
            }else{
              this.showError("Certifique-se do preenchimento de todos os campos!")
            }
          },
        });
      }
    } else {
      if (this.propostaService.verificaRecursos()) {
        this.propostaService
          .postProposta()
          .subscribe({
            next: (response) => {
              console.log("Chama 3x?");

              this.showSuccess("Proposta criada com sucesso!")
              this.router.navigate(['/tela-inicial']);
            },
            error: (err) => {
              this.showError("Não foi possível criar proposta")
            },
          });
      } else {
        this.showError("Adicione pelo menos um recurso!")
      }

    }
  }


  constructor(
    private router: Router,
    private demandaService: DemandaService,
    private propostaService: PropostaService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private rascunhoService: RascunhoService,
    private messageService: MessageService
  ) {
    this.tipoExibicaoTela();

  }

  invalid() {
    return this.demandaService.getFormDemanda.invalid
  }
  invalidProposta() {
    return this.propostaService.getFormProposta.invalid
  }

  teste() {
    console.log(this.propostaService.getFormProposta)
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


  tipoExibicaoTela() {
    if (this.router.url.includes('reformular-demanda')) {
      this.aparecerProposta = false;
      this.demandaService.getDemandaByCodigoDemanda(this.codigoDemandaRota)
        .subscribe(e => {
          this.serviceCalled = true;
          this.demandaService.setFormDemandaData(e);
        })
    } else if (this.router.url.includes('rascunho')) {
      this.aparecerProposta = false;
      this.activatedRoute.params.subscribe(
        e => {
          this.demandaService.demandaForm.patchValue({
            codigoDemanda: e['indiceRascunho']
          })
          this.demandaService.setFormDemandaRascunho(e['indiceRascunho'])
        }
      )
    } else {
      this.aparecerProposta = true;
      this.demandaService.getDemandaByCodigoDemanda(this.codigoDemandaRota)
        .subscribe(e => {
          this.serviceCalled = true;
          this.dadosDemanda = e;
          this.verificaSeTemParecerOuRecomendacao()
          this.demandaService.setFormDemandaData(e);
          this.propostaService.setFormDemandaRascunho(this.codigoDemandaRota)
        })
    }
  }


  //Workflow só funciona corretamente quando o Zoom da tela esta em 100%
  onScroll() {

    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    if (!this.aparecerProposta) {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
          scrollPosition >= sectionTop - 200 &&
          scrollPosition < sectionBottom
        ) {
          this.activeSection = section.id;
        }
        if (scrollPosition >= 1200) {
          this.activeSection = 'section3';
        }
      });
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 50;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (
          scrollPosition >= sectionTop - 200 &&
          scrollPosition < sectionBottom
        ) {
          this.activeSection = section.id;
        }
        if (scrollPosition >= 500) {
          this.activeSection = 'section2';
        }
        if (scrollPosition >= 800) {
          this.activeSection = 'section3';
        }
        if (scrollPosition >= 920) {
          this.activeSection = 'section4';
        }
      });
    }

  }

  indoPraCima(id: string) {
    const scrollHeight = document.documentElement.scrollHeight;
    const element = document.getElementById(id);
    if (element?.id == 'section1') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (element?.id == 'section2') {
      window.scrollTo({ top: 1000, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
    }
  }

  indoPraCimaProposta(id: string) {
    const scrollHeight = document.documentElement.scrollHeight;
    const element = document.getElementById(id);
    if (element?.id == 'section1') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (element?.id == 'section2') {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    } else if (element?.id == 'section3') {
      window.scrollTo({ top: 850, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
    }
  }

  inserirInformacoesFormDemanda(){
    let codigoDemanda = this.route.snapshot.params['indiceRascunho']
    let demanda = this.demandaService.getDemandaByCodigoDemanda(codigoDemanda);
    this.demandaService.demandaForm.patchValue({
      codigoDemanda: codigoDemanda,
    })
  }

  ngOnInit(): void {
    // this.inserirInformacoesFormDemanda()
    let codigoDemanda = this.route.snapshot.params['indiceRascunho']
    this.demandaService.getDemandaByCodigoDemanda(codigoDemanda).subscribe((demada) => {
      this.demandaService.setFormDemandaData(demada)
    })
    window.addEventListener('scroll', this.onScroll.bind(this));
    this.onScroll();
    setInterval(() => {
      let icones = document.getElementsByClassName('nav-scroll');
      for (let i = 0; i < icones.length; i++) {
        if (!this.aparecerProposta) {
          if (icones[i].classList.length > 2) {
            this.titulosDemanda[i].color = '#00579d';
          } else {
            this.titulosDemanda[i].color = 'rgb(233, 233, 233)';
          }
        }
         else if (icones[i].classList.length > 2) {
            this.titulosProposta[i].color = '#00579d';
          } else {
            this.titulosProposta[i].color = 'rgb(233, 233, 233)';
          }
        
      }
    });

    this.titulosDemanda = [
      {
        titulo: 'Dados Gerais',
        id: 'dadosGerais',
        icon: PrimeIcons.CHART_BAR,
        color: 'rgb(233, 233, 233)',
        local: 0,
      },
      {
        titulo: 'Benefícios',
        id: 'beneficios',
        icon: PrimeIcons.DATABASE,
        color: 'rgb(233, 233, 233)',
        local: 600,
      },
      {
        titulo: 'Adicionais',
        id: 'adicionais',
        icon: PrimeIcons.CHECK,
        color: 'rgb(233, 233, 233)',
        local: 1100,
      },
    ];

    this.titulosProposta = [
      {
        titulo: 'Proposta',
        id: 'proposta',
        icon: PrimeIcons.CHART_BAR,
        color: 'rgb(233, 233, 233)',
        local: 0,
      },
      {
        titulo: 'Recursos',
        id: 'recursos',
        icon: PrimeIcons.DATABASE,
        color: 'rgb(233, 233, 233)',
        local: 600,
      },
      {
        titulo: 'Escopo',
        id: 'escopo',
        icon: PrimeIcons.PENCIL,
        color: 'rgb(233, 233, 233)',
        local: 1100,
      },
      {
        titulo: 'Dados Finais',
        id: 'dadosFinais',
        icon: PrimeIcons.CHECK,
        color: 'rgb(233, 233, 233)',
        local: 1700,
      }
    ];
  }
}
