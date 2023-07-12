import { Personalizacao } from './../../../models/personalizacao.model';
import { PersonalizacaoService } from 'src/app/services/personalizacao.service';
import { ConfiguracoesIniciaisService } from './../../../services/configuracoes-iniciais.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Demanda } from 'src/app/models/demanda.model';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Usuario } from 'src/app/models/usuario.model';
import { Reuniao } from 'src/app/models/reuniao.model';
import { StatusReuniao } from 'src/app/models/statusReuniao.enum';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tela-layout',
  templateUrl: './tela-layout.component.html',
  styleUrls: ['./tela-layout.component.scss'],
  providers: [MessageService],
})
export class TelaLayoutComponent implements OnInit {
  themeSelection: boolean = false;
  demanda: Demanda;
  reuniao: Reuniao;
  alterarTamanhoTexto = true;
  tipoExibicaoDemanda = true;
  nivelAcesso = ''
  
  constructor(
    public configIniciaisService: ConfiguracoesIniciaisService,
    private confirmationService: ConfirmationService,
    private personalizacaoService: PersonalizacaoService,
    private messageService: MessageService,
    private usuarioService: UsuarioService
  ) {
    this.nivelAcesso = usuarioService.getRole as string;
    let user: any = {
      nomeUsuario: 'Demanda de exemplo',
      departamentoUsuario: {
        nomeDepartamento: 'Lorem ipsum...',
      },
    };
    this.demanda = {
      statusDemanda: StatusDemanda.DRAFT,
      solicitanteDemanda: user,
      codigoDemanda: '100',
      tituloDemanda: 'Análise de cor',
    };

    let propostas: Demanda[] = [
      {
        tituloDemanda: 'teste',
        busBeneficiadasDemandaClassificada: ['cores novas'],
      },
      {
        tituloDemanda: 'teste',
        busBeneficiadasDemandaClassificada: ['cores novas'],
      },
      {
        tituloDemanda: 'teste',
        busBeneficiadasDemandaClassificada: ['cores novas'],
      },
      {
        tituloDemanda: 'teste',
        busBeneficiadasDemandaClassificada: ['cores novas'],
      },
      {
        tituloDemanda: 'teste',
        busBeneficiadasDemandaClassificada: ['cores novas'],
      },
    ];

    this.reuniao = {
      dataReuniao: new Date(),
      codigoReuniao: 100,
      comissaoReuniao: 'Teste suas cores',
      statusReuniao: StatusReuniao.AGUARDANDO,
      propostasReuniao: propostas,
    };
    this.setarPersonalizacoes();
  }

  checked: boolean = true;
  
  onCheckedChange() {
    this.personalizacaoService.onCheckedChanged(this.checked);
    console.log("Foi 2 " + this.checked);
    
  }

  teste() {
    console.log(this.personalizacaoEscolhida);
    this.showSuccess('foiasjdpofajspodfja');
  }

  setarPersonalizacoes() {
    this.personalizacaoService.getPersonalizacoes().subscribe({
      next: (e) => {
        this.opcoesPersonalizacao = e;
        let personalizacao = this.opcoesPersonalizacao.find(
          (e) => e.ativaPersonalizacao == true
        );
        this.trocarPersonalizacao(personalizacao as Personalizacao);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  novaPersoDemanda: boolean = false;
  definirAtivo(index: number) {
    this.personalizacaoEscolhida = this.opcoesPersonalizacao[index];
    if (this.personalizacaoEscolhida?.codigoPersonalizacao) {
      this.personalizacaoService
        .mudarPersonalizacaoAtiva(
          this.personalizacaoEscolhida.codigoPersonalizacao
        )
        .subscribe({
          next: (e) => {
            this.opcoesPersonalizacao = e;
            let ativa = e.find((e) => e.ativaPersonalizacao == true);
            if (ativa) {
              localStorage.setItem('personalizacao', JSON.stringify(ativa));
              this.personalizacaoService.personalizacaoAtiva = ativa;
            }
            this.personalizacaoEscolhida = ativa;
            alert('Estilo de Cores das Demandas Alterado com sucesso!');
            this.showSuccess(
              'Estilo de Cores das Demandas Alterado com sucesso!'
            );
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  //personalização.value é o índice
  trocarPersonalizacao(personalizacao: Personalizacao) {
    this.personalizacaoEscolhida = personalizacao as Personalizacao;
    if(this.personalizacaoEscolhida.coresPrimariasReuniaoPersonalizacao &&
      this.personalizacaoEscolhida.coresSecundariasReuniaoPersonalizacao){
      this.primaryColorReuniaoSelected = this.personalizacaoEscolhida.coresPrimariasReuniaoPersonalizacao[0]
      this.secondaryColorReuniaoSelected = this.personalizacaoEscolhida.coresSecundariasReuniaoPersonalizacao[0]
    }
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
          this.personalizacaoEscolhida.coresPrimariasReuniaoPersonalizacao[
            count
          ];
        i['corSecundaria'] =
          this.personalizacaoEscolhida.coresSecundariasReuniaoPersonalizacao[
            count
          ];
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

  listOfColorsStatusDemand: {
    status: string;
    corPrimaria: string;
    corSecundaria: string;
  }[] = [
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
    { status: 'Próximo', corPrimaria: '#EF8300', corSecundaria: '#FCC17A' },
    { status: 'Pendente', corPrimaria: '#8862A2', corSecundaria: '#B389CF' },
    { status: 'Concluído', corPrimaria: '#00612E', corSecundaria: '#529572' },
    { status: 'Cancelado', corPrimaria: '#EA1010', corSecundaria: '#FF8383' },
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
    console.log(this.listOfColorsStatusReuniao);
    console.log(this.listOfColorsStatusDemand);
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
        personalizacao.coresPrimariasReuniaoPersonalizacao.push(
          cores.corPrimaria
        );
        personalizacao.coresSecundariasReuniaoPersonalizacao.push(
          cores.corSecundaria
        );
      }
    }

    this.personalizacaoService.postPersonalizacao(personalizacao).subscribe({
      next: (res) => {
        this.setarPersonalizacoes();
        this.showSuccess(
          'Nova Personalização Criada!\n Defina ela como ativa!'
        );
        this.novaPersoDemanda = !this.novaPersoDemanda;
        localStorage.setItem('personalizacao', JSON.stringify(res));
        this.personalizacaoService.personalizacaoAtiva = res;
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
        localStorage.setItem('personalizacao', JSON.stringify(res));
        this.personalizacaoService.personalizacaoAtiva = res;
        alert('Salvo com sucesso!');
        this.showSuccess('Personalização Editada com sucesso!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  secondaryColorSelected = '';
  primaryColorSelected = '';
  secondaryColorReuniaoSelected = '';
  primaryColorReuniaoSelected = '';

  changePrimaryColor(event: any, index: number, tipo: string) {
    // this.demanda.statusDemanda = this.listOfColorsStatusDemand[i].status
    if (tipo == 'demanda') {
      
      this.listOfColorsStatusDemand[index].corPrimaria = event;
      this.primaryColorSelected = event;
      this.secondaryColorSelected =
        this.listOfColorsStatusDemand[index].corSecundaria;
      if (this.personalizacaoEscolhida?.coresPrimariasPersonalizacao) {
        this.personalizacaoEscolhida.coresPrimariasPersonalizacao[index] =
          event;
      }
    } else {
      this.listOfColorsStatusReuniao[index].corPrimaria = event;
      this.primaryColorReuniaoSelected = event;
      this.secondaryColorReuniaoSelected =
        this.listOfColorsStatusReuniao[index].corSecundaria;
      if (this.personalizacaoEscolhida?.coresPrimariasReuniaoPersonalizacao) {
        this.personalizacaoEscolhida.coresPrimariasReuniaoPersonalizacao[
          index
        ] = event;
      }
    }
  }

  changeSecondaryColor(event: any, index: number, tipo: string) {
    // this.demanda.statusDemanda = this.listOfColorsStatusDemand[i].status
    if (tipo == 'demanda') {
      this.listOfColorsStatusDemand[index].corSecundaria = event;
      this.primaryColorSelected =
        this.listOfColorsStatusDemand[index].corPrimaria;
      this.secondaryColorSelected = event;
      if (this.personalizacaoEscolhida?.coresSecundariasPersonalizacao) {
        this.personalizacaoEscolhida.coresSecundariasPersonalizacao[index] =
          event;
      }
    } else {
      this.listOfColorsStatusReuniao[index].corSecundaria = event;
      this.primaryColorReuniaoSelected =
        this.listOfColorsStatusReuniao[index].corPrimaria;
      this.secondaryColorReuniaoSelected = event;
      if (this.personalizacaoEscolhida?.coresSecundariasReuniaoPersonalizacao) {
        this.personalizacaoEscolhida.coresSecundariasReuniaoPersonalizacao[
          index
        ] = event;
      }
    }
  }

  deletarPersonalizacao(index: number) {
    this.personalizacaoEscolhida = this.opcoesPersonalizacao[index]
    if (this.personalizacaoEscolhida?.ativaPersonalizacao == true) {
      alert(
        'Você não pode excluir uma personalização que se encontra ativa! Defina uma outra personalização como ativa, e então exclua esta.'
      );
      return;
    }
    this.personalizacaoService
      .deletePersonalizacao(
        this.personalizacaoEscolhida?.codigoPersonalizacao as number
      )
      .subscribe({
        next: (e) => {
          let index = this.opcoesPersonalizacao.findIndex(
            (e) =>
              e.codigoPersonalizacao ==
              this.personalizacaoEscolhida?.codigoPersonalizacao
          );
          this.opcoesPersonalizacao.splice(index, 1);
          this.setarPersonalizacoes();
          alert('Deletado com sucesso!');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  setFontTheme(opc: string) {
    this.configIniciaisService.setFontTheme(opc);
  }
  salvarEDefinirAtivo() {
    this.editarPersonalizacao();
    let index = this.opcoesPersonalizacao.findIndex(
      (e) =>
        e.codigoPersonalizacao ==
        this.personalizacaoEscolhida?.codigoPersonalizacao
    );
    this.definirAtivo(index);
  }
  redefinir() {
    this.configIniciaisService.redefinir();
    
    this.showSuccess(
      'Estilos redefinidos com sucesso!'
    );
  }

  setFontSize(opc: string) {
    this.configIniciaisService.setFontSize(opc);
  }

  ngOnInit(): void {}
}
