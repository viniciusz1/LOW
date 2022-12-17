import { DemandaService } from 'src/app/services/demanda.service';
import { Router } from '@angular/router';
import { Recurso } from './../../../../models/recurso.model';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { MessageService, PrimeIcons, SelectItem } from 'primeng/api';
import { TipoDespesa } from 'src/app/models/tipoDespesa.enum';
import { ScrollSpyService } from 'ng-spy';
import { SpyTarget } from 'ng-spy/lib/spy-target.model';

interface CentrosCusto {
  centro: string;
}

interface Moedas {
  abreviacao: string;
}

@Component({
  selector: 'app-tela-corrida',
  templateUrl: './tela-corrida.component.html',
  styleUrls: ['./tela-corrida.component.scss'],
})
export class TelaCorridaComponent implements OnInit {
  aparecerProposta = false;
  formDemanda = new FormBuilder();
  onSubmitDemanda() {
    this.demandaService.postDemanda().subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (err) => {
          console.error(err)
        }
      })
  }


  constructor(
    private spyService: ScrollSpyService,
    private router: Router,
    private demandaService: DemandaService,
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
      // {titulo: 'Propostas', id: 'propostas', icon: PrimeIcons.CHECK, color: 'rgb(233, 233, 233)'},
      // {titulo: 'Recursos', id: 'recursos', icon: PrimeIcons.CHECK, color: 'rgb(233, 233, 233)'},
      // {titulo: 'Escopo', id: 'escopo', icon: PrimeIcons.CHECK, color: 'rgb(233, 233, 233)'},
      // {titulo: 'Dados Finais', id: 'dadosFinais', icon: PrimeIcons.CHECK, color: 'rgb(233, 233, 233)'},
  ];
  }
  

}
