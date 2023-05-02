import { CentroCusto } from './../../../../models/centro-custo.model';
import { PropostaService } from './../../../../services/proposta.service';
import { DemandaService } from 'src/app/services/demanda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
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
  activeSection: string = '';
  tabs2: Tab[] = [
    { title: 'Aba 1', content: 'Conteúdo da Aba 1' },
    { title: 'Aba 2', content: 'Conteúdo da Aba 2' },
    { title: 'Aba 3', content: 'Conteúdo da Aba 3' }
  ];

  activeIndex = 1;

  onSubmitDemanda() {
    if (!this.aparecerProposta) {

      if (this.router.url.includes('reformular-demanda')) {
        this.demandaService.reformularDemanda().subscribe({
          next: (response) => {
            this.router.navigate(['/tela-inicial']);
          },
          error: (err) => {
            alert('Ocorreu um erro: ' + err.status);
          },
        });
      } else {
        this.demandaService.postDemanda().subscribe({
          next: (response) => {
            let codigo = this.route.snapshot.params['indiceRascunho']
            this.rascunhoService.deleteRascunho(codigo)
            this.router.navigate(['/tela-inicial']);
          },
          error: (err) => {
            alert('Ocorreu um erro: ' + err.message);
          },
        });
      }
    } else {
      this.propostaService
        .postProposta()
        .subscribe({
          next: (response) => {
            this.router.navigate(['/tela-inicial']);
          },
          error: (err) => {
            alert('Ocorreu um erro: ' + err.message);
          },
        });
    }
  }


  constructor(
    private router: Router,
    private demandaService: DemandaService,
    private propostaService: PropostaService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private rascunhoService: RascunhoService
  ) {
    this.tipoExibicaoTela();

  }

  teste() {
    return this.demandaService.getFormDemandaInvalid
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
          this.demandaService.setFormDemandaRascunho(e['indiceRascunho'])
        }
      )
    } else {
      this.aparecerProposta = true;
      this.demandaService.getDemandaByCodigoDemanda(this.codigoDemandaRota)
        .subscribe(e => {
          this.serviceCalled = true;
          this.demandaService.setFormDemandaData(e);
          this.propostaService.setFormDemandaRascunho(this.codigoDemandaRota)
        })
    }
  }


  onScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 50;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (
        scrollPosition >= sectionTop - 200 &&
        scrollPosition < sectionBottom
      ) {
        this.activeSection = section.id;
      }
      if (scrollPosition == 890) {
        this.activeSection = 'section3';
      }
    });
  }

  indoPraCima(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
    this.onScroll();
    setInterval(() => {
      let icones = document.getElementsByClassName('nav-scroll');
      for (let i = 0; i < icones.length; i++) {
        if (icones[i].classList.length > 2) {
          this.titulosDemanda[i].color = '#00579d';
        } else {
          this.titulosDemanda[i].color = 'rgb(233, 233, 233)';
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
  }
}
