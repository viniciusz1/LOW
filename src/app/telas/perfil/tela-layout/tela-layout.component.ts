import { Personalizacao } from './../../../models/personalizacao.model';
import { PersonalizacaoService } from 'src/app/services/personalizacao.service';
import { ConfiguracoesIniciaisService } from './../../../services/configuracoes-iniciais.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Demanda } from 'src/app/models/demanda.model';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';

@Component({
  selector: 'app-tela-layout',
  templateUrl: './tela-layout.component.html',
  styleUrls: ['./tela-layout.component.scss'],
})
export class TelaLayoutComponent implements OnInit {
  themeSelection: boolean = false;
  demanda: Demanda;
  alterarTamanhoTexto = true;
  tipoExibicaoDemanda = true;

  constructor(
    public configIniciaisService: ConfiguracoesIniciaisService,
    private confirmationService: ConfirmationService,
    private personalizacaoService: PersonalizacaoService
  ) {
    this.demanda = { statusDemanda: StatusDemanda.ASSESSMENT };
    this.personalizacaoService.getPersonalizacoes().subscribe({
      next: (e) => {
        console.log(e)
        this.opcoesPersonalizacao = e;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  trocarPersonalizacao(personalizacao: any){
    let personalizacaoEscolhida = this.opcoesPersonalizacao[personalizacao.value]
    // console.log(personalizacao)
    // console.log(this.listOfColorsStatusDemand)
    let count= 0
    for(let i of this.listOfColorsStatusDemand){
      if(personalizacaoEscolhida.coresPrimariasPersonalizacao && personalizacaoEscolhida.coresSecundariasPersonalizacao){
        i['corPrimaria'] = personalizacaoEscolhida.coresPrimariasPersonalizacao[count]
        i['corSecundaria'] = personalizacaoEscolhida.coresSecundariasPersonalizacao[count]
      }
      // console.log(i)
      count++;
    }
  }

  //Muda a exibição das demandas para formato de lista
  changeToList() {
    this.tipoExibicaoDemanda = false;
  }

  //Muda a exibição das demandas para formato de card
  changeToCard() {
    this.tipoExibicaoDemanda = true;
  }
  opcoesPersonalizacao: Personalizacao[] = [];
  confirmacaoTrocaLayout: boolean = false;

  openModalTrocarModoExibicao(number: number) {
    this.confirmacaoTrocaLayout = false;
    this.confirmationService.confirm({
      key: 'trocarExibicao',
      message: 'Deseja realmente trocar o modo de exibição?',
      dismissableMask: true,
      blockScroll: false,
      header: 'Alterar modo de exibição',
      accept: () => {
        if (number == 1) {
          this.changeToCard();
        } else {
          this.changeToList();
        }
        localStorage.setItem(
          'exibicao',
          JSON.stringify(this.tipoExibicaoDemanda)
        );
      },
    });
  }

  listOfColorsStatusDemand = [
    { status: 'Draft', corPrimaria: '#72BBF7', corSecundaria: '#A7D5FB' },
    {
      status: 'Backlog - Classificação',
      corPrimaria: '#00579D',
      corSecundaria: '#4889B8',
    },
    {
      status: 'Backlog - Proposta',
      corPrimaria: '#00579D',
      corSecundaria: '#4889B8',
    },
    {
      status: 'Backlog - Aprovação',
      corPrimaria: '#00579D',
      corSecundaria: '#4889B8',
    },
    { status: 'Assessment', corPrimaria: '#8862A2', corSecundaria: '#B389CF' },
    {
      status: 'Business Case',
      corPrimaria: '#FFDD43',
      corSecundaria: '#FFF0AA',
    },
    { status: 'Discussion', corPrimaria: '#B4B0A8', corSecundaria: '#D2CFC7' },
    { status: 'To-do', corPrimaria: '#EF8300', corSecundaria: '#FCC17A' },
    {
      status: 'Design and Build',
      corPrimaria: '#000000',
      corSecundaria: '#494949',
    },
    { status: 'Support', corPrimaria: '#0091BD', corSecundaria: '#65CEEE' },
    { status: 'Cancelled', corPrimaria: '#EA1010', corSecundaria: '#FF8383' },
    { status: 'Done', corPrimaria: '#00612E', corSecundaria: '#529572' },
  ];

  listOfColorsStatusReuniao = [
    { status: 'Aguardando', corPrimaria: '#00579D', corSecundaria: '#4889B8' },
    { status: 'Pendente', corPrimaria: '#8862A2', corSecundaria: '#B389CF' },
    { status: 'Próximo', corPrimaria: '#EF8300', corSecundaria: '#FCC17A' },
    { status: 'Cancelado', corPrimaria: '#EA1010', corSecundaria: '#FF8383' },
    { status: 'Concluído', corPrimaria: '#00612E', corSecundaria: '#529572' },
  ];

  salvarAlteracoes() {
    let personalizacao: Personalizacao = {
      coresPrimariasPersonalizacao: [],
      coresSecundariasPersonalizacao: [],
      ativaPersonalizacao: true,
    };

    for (let cores of this.listOfColorsStatusDemand) {
      if (
        personalizacao.coresPrimariasPersonalizacao &&
        personalizacao.coresSecundariasPersonalizacao
      ) {
        personalizacao.coresPrimariasPersonalizacao.push(cores.corPrimaria);
        personalizacao.coresSecundariasPersonalizacao.push(cores.corSecundaria);
      }
    }

    this.personalizacaoService.postPersonalizacao(personalizacao).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  secondaryColorSelected = '';
  primaryColorSelected = '';

  changePrimaryColor(event: any, index: number) {
    // this.demanda.statusDemanda = this.listOfColorsStatusDemand[i].status
    this.listOfColorsStatusDemand[index].corPrimaria = event;
    this.primaryColorSelected = event;
    this.secondaryColorSelected =
      this.listOfColorsStatusDemand[index].corSecundaria;
  }

  changeSecondaryColor(event: any, index: number) {
    // this.demanda.statusDemanda = this.listOfColorsStatusDemand[i].status

    this.listOfColorsStatusDemand[index].corSecundaria = event;
    this.primaryColorSelected =
      this.listOfColorsStatusDemand[index].corPrimaria;
    this.secondaryColorSelected = event;
  }

  setFontTheme(opc: string) {
    this.configIniciaisService.setFontTheme(opc);
  }

  redefinir() {
    this.configIniciaisService.redefinir();
  }

  setFontSize(opc: string) {
    this.configIniciaisService.setFontSize(opc);
  }

  ngOnInit(): void {}
}
