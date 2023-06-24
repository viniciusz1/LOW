import { Personalizacao } from './../../../models/personalizacao.model';
import { PersonalizacaoService } from 'src/app/services/personalizacao.service';
import { ConfiguracoesIniciaisService } from './../../../services/configuracoes-iniciais.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Demanda } from 'src/app/models/demanda.model';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';

@Component({
  selector: 'app-tela-layout',
  templateUrl: './tela-layout.component.html',
  styleUrls: ['./tela-layout.component.scss'],
  providers: [ MessageService]
})
export class TelaLayoutComponent implements OnInit {
  themeSelection: boolean = false;
  demanda: Demanda;
  alterarTamanhoTexto = true;
  tipoExibicaoDemanda = true;

  constructor(
    public configIniciaisService: ConfiguracoesIniciaisService,
    private confirmationService: ConfirmationService,
    private personalizacaoService: PersonalizacaoService,
    private messageService: MessageService
  ) {
    this.demanda = { statusDemanda: StatusDemanda.ASSESSMENT };
    this.setarPersonalizacoes()
  }

  teste(){
    console.log("ok")
    this.showSuccess("foiasjdpofajspodfja")
  }

  setarPersonalizacoes(){
    this.personalizacaoService.getPersonalizacoes().subscribe({
      next: (e) => {

        this.opcoesPersonalizacao = e;
        let index = this.opcoesPersonalizacao.findIndex(
          (e) => (e.ativaPersonalizacao == true)
        );
        this.trocarPersonalizacao({value: index})
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  novaPersoDemanda: boolean = false;
  definirAtivo() {
    if (this.personalizacaoEscolhida?.codigoPersonalizacao) {
      this.personalizacaoService
        .mudarPersonalizacaoAtiva(
          this.personalizacaoEscolhida.codigoPersonalizacao
        )
        .subscribe({
          next: (e) => {
            this.opcoesPersonalizacao = e;
            let ativa = e.find(e => e.ativaPersonalizacao == true);
            if(ativa){
              localStorage.setItem('personalizacao', JSON.stringify(ativa))
              this.personalizacaoService.personalizacaoAtiva = ativa
            }
            this.showSuccess("Estilo de Cores das Demandas Alterado com sucesso!")
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  //personalização.value é o índice
  trocarPersonalizacao(personalizacao: any) {
    this.personalizacaoEscolhida =
      this.opcoesPersonalizacao[personalizacao.value];
    let count = 0;
    for (let i of this.listOfColorsStatusDemand) {
      if (
        this.personalizacaoEscolhida.coresPrimariasPersonalizacao &&
        this.personalizacaoEscolhida.coresSecundariasPersonalizacao
      ) {
        i['corPrimaria'] =
          this.personalizacaoEscolhida.coresPrimariasPersonalizacao[count];
        i['corSecundaria'] =
          this.personalizacaoEscolhida.coresSecundariasPersonalizacao[count];
      }
      count++;
    }
    count = 0;
    
    for (let i of this.listOfColorsStatusReuniao) {
      if (
        this.personalizacaoEscolhida.coresPrimariasReuniaoPersonalizacao &&
        this.personalizacaoEscolhida.coresSecundariasReuniaoPersonalizacao
      ) {
        i['corPrimaria'] =
          this.personalizacaoEscolhida.coresPrimariasReuniaoPersonalizacao[count];
        i['corSecundaria'] =
          this.personalizacaoEscolhida.coresSecundariasReuniaoPersonalizacao[count];
      }
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
  personalizacaoEscolhida: Personalizacao | undefined;
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

  listOfColorsStatusDemand: { status: string, corPrimaria:  string, corSecundaria:  string}[] = [
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

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  criarNovaPersonalizacao(value: string) {
    console.log(this.listOfColorsStatusReuniao)
    console.log(this.listOfColorsStatusDemand)
    if (value == '') {
      return;
    }

    let personalizacao: Personalizacao = {
      coresPrimariasPersonalizacao: [],
      coresSecundariasPersonalizacao: [],
      coresPrimariasReuniaoPersonalizacao: [],
      coresSecundariasReuniaoPersonalizacao: [],
      ativaPersonalizacao: true,
      nomePersonalizacao: value,
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

    for (let cores of this.listOfColorsStatusReuniao) {
      if (
        personalizacao.coresPrimariasReuniaoPersonalizacao &&
        personalizacao.coresSecundariasReuniaoPersonalizacao
      ) {
        personalizacao.coresPrimariasReuniaoPersonalizacao.push(cores.corPrimaria);
        personalizacao.coresSecundariasReuniaoPersonalizacao.push(cores.corSecundaria);
      }
    }

    this.personalizacaoService.postPersonalizacao(personalizacao).subscribe({
      next: (res) => {
        this.setarPersonalizacoes();
        this.showSuccess("Nova Personalização Criada!\n Defina ela como ativa!")
        this.novaPersoDemanda = !this.novaPersoDemanda
        localStorage.setItem('personalizacao', JSON.stringify(res))
        this.personalizacaoService.personalizacaoAtiva = res
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editarPersonalizacao() {
    let personalizacao = this.personalizacaoEscolhida as Personalizacao;
    this.personalizacaoService.putPersonalizacao(personalizacao).subscribe({
      next: (res) => {
        localStorage.setItem('personalizacao', JSON.stringify(res))
        this.personalizacaoService.personalizacaoAtiva = res
        this.showSuccess("Personalização Editada com sucesso!")
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
    if (this.personalizacaoEscolhida?.coresPrimariasPersonalizacao) {
      this.personalizacaoEscolhida.coresPrimariasPersonalizacao[index] = event;
    }
  }

  changeSecondaryColor(event: any, index: number) {
    // this.demanda.statusDemanda = this.listOfColorsStatusDemand[i].status

    this.listOfColorsStatusDemand[index].corSecundaria = event;
    this.primaryColorSelected =
      this.listOfColorsStatusDemand[index].corPrimaria;
    this.secondaryColorSelected = event;
    if (this.personalizacaoEscolhida?.coresSecundariasPersonalizacao) {
      this.personalizacaoEscolhida.coresSecundariasPersonalizacao[index] =
        event;
    }
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

  ngOnInit(): void { }
}
