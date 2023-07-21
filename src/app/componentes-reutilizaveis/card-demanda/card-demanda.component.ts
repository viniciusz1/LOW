import { UsuarioService } from 'src/app/services/usuario.service';
import { NivelAcesso } from './../../models/nivel-acesso.enum';
import { RotasModule } from './../../rotas.module';
import { StatusDemanda } from './../../models/statusDemanda.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Demanda } from 'src/app/models/demanda.model';
import { Route, Router } from '@angular/router';
import { RascunhoService } from 'src/app/services/rascunho.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReuniaoService } from 'src/app/services/reuniao.service';
import { Reuniao } from 'src/app/models/reuniao.model';
import { PersonalizacaoService } from 'src/app/services/personalizacao.service';
import { DemandaService } from 'src/app/services/demanda.service';


@Component({
  selector: 'app-card-demanda',
  templateUrl: './card-demanda.component.html',
  styleUrls: ['./card-demanda.component.scss'],
  providers: [NgbDropdownConfig],
})
export class CardDemandaComponent implements OnInit {
  //Variáveis que são enviadas informações
  @Output() abrirModalMotivoReprovacao = new EventEmitter<Demanda>();
  @Output() abrirModalAvaliarDemanda = new EventEmitter();
  @Output() abrirModalParecerComissao = new EventEmitter<Demanda>();
  @Output() abrirModalParecerDG = new EventEmitter<Demanda>();
  @Output() abrirModalReprovar = new EventEmitter<Demanda>();
  @Output() verDocumentoProposta = new EventEmitter<Demanda>();
  @Output() clicouEmExcluir = new EventEmitter();
  @Output() irParaChat = new EventEmitter();
  @Output() abrirModalCriarReuniao = new EventEmitter<Demanda>();
  @Output() modalHistorico = new EventEmitter();
  @Output() verDocumentoEmAta = new EventEmitter();
  @Output() avancarStatusDemanda = new EventEmitter<{
    mensagem: string;
    codigoDemanda: string | undefined;
    statusDemanda: StatusDemanda | undefined;
  }>();

  //Variáveis que são atribuídas informações
  @Input() mudarTamanho: string = '390px';
  @Input() isPauta: boolean = false;
  @Input() dadosDemanda: Demanda = {};
  @Input() demandaEmReuniao: boolean = false;
  @Input() rascunho: boolean = false;
  @Input() tipoDeAta: string = '';
  @Input() mostrarBotao = true;
  @Input() primaryColor?: string = '';
  @Input() secondaryColor: string = '';

  //Variáveis declaradas na classe
  textoExibidoEmBotaoDependendoRota: | { rota: string; texto: string } | undefined = undefined;
  primaryColorClass?: string = '';
  secondaryColorClass: string = '';
  analistaAssociado: boolean = false;
  codigoReuniao: number | undefined;
  demandaEncontrada: boolean = false;
  motivoDemandaPropria = "Os motivos não foram disponibilizados";
  reunioes: Reuniao[] | undefined;
  isFavorita = false;

  constructor(private route: Router,
    private reuniaoService: ReuniaoService,
    private confirmationService: ConfirmationService,
    private rascunhoService: RascunhoService,
    public usuarioService: UsuarioService,
    private messageService: MessageService,
    private demandaService: DemandaService,
    private personalizacaoService: PersonalizacaoService) {

  }

  //Verifica o status da demanda e exibe o botão de Parecer da Comissão
  exibirBotaoParecerComissao() {
    if (this.demandaEmReuniao && (this.dadosDemanda.parecerComissaoProposta != null) && this.dadosDemanda.statusDemanda == StatusDemanda.DISCUSSION) {
      return true;
    }
    return false;
  }

  //Se a demanda for do próprio usuário, ele poderá cancelar sem informar o motivo, apenas com um modal de confirmação
  cancelarPropriaDemanda() {
    this.confirmationService.confirm({
      dismissableMask: true,
      header: 'Cancelar Demanda',
      blockScroll: false,
      message: 'Tem certeza que deseja cancelar esta demanda?',
      accept: () => {
        if (this.dadosDemanda.codigoDemanda) {
          this.demandaService
            .reprovarDemanda(
              parseInt(this.dadosDemanda.codigoDemanda),
              this.motivoDemandaPropria
            )
            .subscribe({
              next: event => {
                this.showSuccess("Demanda cancelada com sucesso!")
              },
              error: err => {
                this.showError("Não foi possivel cancelar a demanda!")
              }
            });
        }
      },
    });
  }

  //Quando criada uma Reunião, esta função ja encaminha a mesma para a tela dos detalhes da reunião
  encaminharParaReuniao(codigoDemanda?: string) {
    this.reuniaoService.getReuniao().subscribe(reunioes => {
      this.reunioes = reunioes;
      this.procurarCodigoDemanda(codigoDemanda);
      if (this.demandaEncontrada) {
        this.route.navigate(['tela-inicial/ver-reuniao/' + this.codigoReuniao]);
      }
    });
  }

  //Procura códigos da demanda pelas reuniões
  procurarCodigoDemanda(codigoDemanda: string | undefined) {
    //Se existir reuniões
    if (this.reunioes) {
      //Entra em uma busca na lista de reuniões
      for (const reuniao of this.reunioes) {
        //Se a reunião tiver uma proposta de reunião
        if (reuniao.propostasReuniao) {
          //Entra em outra busca pelas demandas dentro das propostas da reuniao
          for (const demanda of reuniao.propostasReuniao) {
            //Se o código da demanda for igual ao código passado no parâmetro
            if (demanda.codigoDemanda == codigoDemanda) {
              //Verifica o codigo da reunião e retorna true para demanda encontrada
              this.codigoReuniao = reuniao.codigoReuniao;
              this.demandaEncontrada = true;
              return;
            }
          }
        }
      }
    }
  }

  //Mapeia o valor ordinal do status e retorna a posição
  getOrdinalValueStatusDemanda(value: StatusDemanda | undefined): number | undefined {
    const enumValues = Object.values(StatusDemanda);
    const index = enumValues.indexOf(value as StatusDemanda);
    return index !== -1 ? index : undefined;
  }

  //Verifica os status permitidos para determinadas funções
  statusPermitido() {
    if (
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_APROVACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.ASSESSMENT ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BUSINESS_CASE
    ) {
      return true;
    }
    return false;
  }

  //Verifica se é exibido o ícone de chat
  exibirIniciarChat() {
    //Verifica se o usuário é um Gestor de TI ou um Analista
    if (
      this.usuarioService.getRole == NivelAcesso.GestorTI ||
      this.usuarioService.getRole == NivelAcesso.Analista
    ) {
      //Verifica se a demanda não é do próprio usuário
      if (
        this.dadosDemanda.solicitanteDemanda?.codigoUsuario ==
        this.usuarioService.getCodigoUser()
      ) {
        return false;
      }
    }
    return true;
  }

  //Formata o número pras casas decimais corretas
  formatarNumero(numero: number | undefined, casasDecimais: number): string {
    return numero !== undefined ? numero.toFixed(casasDecimais) : '';
  }

  //Retorna o status precedente ao atual
  retornaProximoStatusDemanda(statusDemanda: StatusDemanda | undefined) {
    switch (statusDemanda) {
      case StatusDemanda.BACKLOG_CLASSIFICACAO:
        return StatusDemanda.BACKLOG_APROVACAO;
      case StatusDemanda.BACKLOG_APROVACAO:
        return StatusDemanda.BACKLOG_PROPOSTA;
      case StatusDemanda.BACKLOG_PROPOSTA:
        return StatusDemanda.ASSESSMENT;
      case StatusDemanda.ASSESSMENT:
        return StatusDemanda.DISCUSSION;
      case StatusDemanda.BUSINESS_CASE:
        return StatusDemanda.DISCUSSION;
      case StatusDemanda.DISCUSSION:
        return StatusDemanda.TO_DO;
      case StatusDemanda.TO_DO:
        return StatusDemanda.DESIGN_AND_BUILD;
      case StatusDemanda.DESIGN_AND_BUILD:
        return StatusDemanda.SUPPORT;
      case StatusDemanda.SUPPORT:
        return StatusDemanda.DONE;
      case StatusDemanda.DONE:
        return StatusDemanda.DONE;
      default:
        return 0;
    }
  }

  //Abre o modal de Histórico
  abrirModalHistorico() {
    this.modalHistorico.emit(this.dadosDemanda.codigoDemanda);
  }

  //Verifica o status da demanda e retorna a porcentagem de progressão
  porcentagemBarraProgressao() {
    switch (this.dadosDemanda.statusDemanda) {
      case StatusDemanda.DRAFT: return 0
      case StatusDemanda.BACKLOG_CLASSIFICACAO: return 10
      case StatusDemanda.BACKLOG_APROVACAO: return 20
      case StatusDemanda.BACKLOG_PROPOSTA: return 30
      case StatusDemanda.ASSESSMENT: return 40
      case StatusDemanda.BUSINESS_CASE: return 40
      case StatusDemanda.DISCUSSION: return 50
      case StatusDemanda.TO_DO: return 60
      case StatusDemanda.DESIGN_AND_BUILD: return 70
      case StatusDemanda.SUPPORT: return 80
      case StatusDemanda.DONE: return 100
      default: return 0
    }
  }

  //Verifica se o usuário é um Solicitante
  versaoSolicitante() {
    if (this.usuarioService.getRole == 'Solicitante') {
      return true;
    }
    return false;
  }

  //Verifica se a demanda é do usuário e retorna true para exibir o botão de cancelar própria demanda
  mostrarCancelarPropriaDemanda() {
    if (
      this.usuarioService.getCodigoUser() ==
      this.dadosDemanda.solicitanteDemanda?.codigoUsuario
    ) {
      return true;
    }
    return false;
  }

  //Confirma se o usuário realmente quer iniciar uma conversa
  confirmarChat() {
    this.confirmationService.confirm({
      message: 'Deseja realmente iniciar esta conversa?',
      dismissableMask: true,
      header: 'Iniciar Chat',
      accept: () => {
        this.route.navigate(['/tela-inicial/chat']);
      },
    });
  }

  //Verifica os status que necessitam da exibição do modal da Ata
  existeAta() {
    if (
      this.dadosDemanda.statusDemanda == StatusDemanda.TO_DO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.SUPPORT ||
      this.dadosDemanda.statusDemanda == StatusDemanda.DESIGN_AND_BUILD ||
      this.dadosDemanda.statusDemanda == StatusDemanda.DONE
    ) {
      return true;
    }
    return false;
  }

  //Função chamada quando o usuário clica na ação do card
  direcionarUsuario() {
    switch (this.textoExibidoEmBotaoDependendoRota?.rota) {
      case '':
        this.abrirModalMotivoReprovacao.emit(this.dadosDemanda);
        break;
      case 'ABRIR_MODAL_AVALIAR':
        this.verDocumentoProposta.emit(this.dadosDemanda);
        break;
      case 'MODAL_ADD_REUNIAO':
        this.abrirModalCriarReuniao.emit(this.dadosDemanda);
        break;
      case 'IR_PARA_REUNIAO':
        this.encaminharParaReuniao(this.dadosDemanda.codigoDemanda);
        break;
      case 'ver em ata':
        break;
      case 'MODAL_AVANCAR_FASE':
        this.avancarStatusDemanda.emit({
          mensagem:
            'Tem certeza que deseja avançar a fase da demanda?<br>Ela avançará para o Status: ' +
            this.retornaProximoStatusDemanda(this.dadosDemanda.statusDemanda),
          codigoDemanda: this.dadosDemanda.codigoDemanda,
          statusDemanda: this.dadosDemanda.statusDemanda,
        });
        break;
      case 'VER_DOCUMENTO':
        this.verDocumentoProposta.emit(this.dadosDemanda);
        break;
      case 'PARECER_COMISSAO':
        this.abrirModalParecerComissao.emit(this.dadosDemanda);
        break;
      case 'PARECER_DG':
        this.abrirModalParecerDG.emit(this.dadosDemanda);
        break;
      default:
        //Caso não tenha uma função pré-definida, vai para a rota atrelada ao botão
        this.route.navigate([this.textoExibidoEmBotaoDependendoRota?.rota]);
    }
  }

  //Identifica o status e a ação que o usuário deve decidir, mostrando no botão
  exibicaoBotoes() {
    //Verifica o nível de acesso do usuário
    const nivelAcesso = this.usuarioService.getRole;
    //Caso o usuário não tenha permissão de ação na demanda, ele poderá ve-la
    this.textoExibidoEmBotaoDependendoRota = {
      rota: 'VER_DOCUMENTO',
      texto: 'Ver Demanda',
    };
    if (this.dadosDemanda.statusDemanda == StatusDemanda.CANCELLED && this.demandaEmReuniao == true) {
      this.textoExibidoEmBotaoDependendoRota = {
        rota: 'VER_DOCUMENTO',
        texto: 'Ver Demanda',
      };
      return true
    }

    //Caso o card seja definido que não precisa mostrar o botão
    if (!this.mostrarBotao) {
      return false;
    }

    //Caso a rota não existir, é um comando para a função direcionarUsuario()
    switch (this.dadosDemanda.statusDemanda) {

      case StatusDemanda.BACKLOG_CLASSIFICACAO:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          if (
            nivelAcesso == 'GestorTI' ||
            this.dadosDemanda.solicitanteDemanda?.codigoUsuario !=
            this.usuarioService.getCodigoUser()
          ) {
            this.textoExibidoEmBotaoDependendoRota = {
              rota:
                '/tela-inicial/classificar-demanda/' +
                this.dadosDemanda.codigoDemanda,
              texto: 'Classificar Demanda',
            };
          }
        }
        return true;

      case StatusDemanda.BACKLOG_PROPOSTA:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: '/tela-inicial/proposta/' + this.dadosDemanda.codigoDemanda,
            texto: 'Criar Proposta',
          };
        }
        return true;

      case StatusDemanda.BACKLOG_APROVACAO:
        if (nivelAcesso == 'GerenteNegocio' || nivelAcesso == 'GestorTI') {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'ABRIR_MODAL_AVALIAR',
            texto: 'Avaliar Demanda',
          };
        }
        return true;

      case StatusDemanda.ASSESSMENT:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'MODAL_ADD_REUNIAO',
            texto: 'Adicionar Proposta',
          };
        }
        return true;

      case StatusDemanda.BUSINESS_CASE:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'MODAL_ADD_REUNIAO',
            texto: 'Adicionar Proposta',
          };
        }
        return true;

      case StatusDemanda.TO_DO:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'MODAL_AVANCAR_FASE',
            texto: 'Avançar Fase',
          };
        }
        return true;

      case StatusDemanda.DESIGN_AND_BUILD:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'MODAL_AVANCAR_FASE',
            texto: 'Avançar Fase',
          };
        }
        return true;

      case StatusDemanda.SUPPORT:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'MODAL_AVANCAR_FASE',
            texto: 'Avançar Fase',
          };
        }
        return true;

      case StatusDemanda.CANCELLED:
        this.textoExibidoEmBotaoDependendoRota = {
          rota: '',
          texto: 'Motivo',
        };
        return true;

      case StatusDemanda.DRAFT:
        this.rascunho = true;
        this.textoExibidoEmBotaoDependendoRota = {
          rota: 'tela-inicial/rascunho/' + this.dadosDemanda.codigoDemanda,
          texto: 'Continuar Demanda',
        };
        return true;

      case StatusDemanda.DISCUSSION:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          if (this.dadosDemanda.parecerComissaoProposta?.length == null && this.demandaEmReuniao == true) {
            this.textoExibidoEmBotaoDependendoRota = {
              rota: 'PARECER_COMISSAO',
              texto: 'Parecer Comissao',
            };
            return true;
          } else if (this.dadosDemanda.parecerComissaoProposta?.length == null && this.demandaEmReuniao == false) {
            this.textoExibidoEmBotaoDependendoRota = {
              rota: 'IR_PARA_REUNIAO',
              texto: 'Ir para Reunião',
            };
            return true;
          } else {
            this.textoExibidoEmBotaoDependendoRota = {
              rota: 'PARECER_DG',
              texto: 'Parecer da DG',
            };
          }
        }
        return true;

      default:
        return true;
    }
  }

  //Deleta o rascunho
  deletarRascunho() {
    if (this.dadosDemanda.codigoDemanda) {
      this.clicouEmExcluir.emit(this.dadosDemanda);
    } else {
      this.showError('Não foi possível excluir o rascunho!');
    }
  }

  //Exibe feedback de sucesso
  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Successo',
      detail: message,
    });
  }

  //Exibe feedback de Errp
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  //Verifica os status que existem em pauta
  existePauta() {
    if (
      this.dadosDemanda.statusDemanda == StatusDemanda.ASSESSMENT ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BUSINESS_CASE ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_APROVACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA ||
      this.dadosDemanda.statusDemanda == StatusDemanda.CANCELLED
    ) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {

    //Adicionando classes para estilização do card
    if (this.personalizacaoService.personalizacaoAtiva.coresPrimariasPersonalizacao && this.personalizacaoService.personalizacaoAtiva.coresSecundariasPersonalizacao) {
      let ordinal = this.getOrdinalValueStatusDemanda(this.dadosDemanda.statusDemanda) as number
      this.primaryColor = this.personalizacaoService.personalizacaoAtiva.coresPrimariasPersonalizacao[ordinal]
      this.secondaryColor = this.personalizacaoService.personalizacaoAtiva.coresSecundariasPersonalizacao[ordinal]
    }
    this.primaryColorClass = this.dadosDemanda.statusDemanda;
    this.secondaryColorClass = this.dadosDemanda.statusDemanda + '-sec';

    //Verificando demandas que ja existem analistas associados
    if (this.dadosDemanda.analista) {
      this.analistaAssociado = true;
    } else {
      this.analistaAssociado = false;
    }

    //verifica se a demanda é favorita
    if (this.dadosDemanda.usuariosFavoritos) {
      for (let user of this.dadosDemanda.usuariosFavoritos) {
        if (user.codigoUsuario == this.usuarioService.getCodigoUser()) {
          this.isFavorita = true
        }
      }
    }

    this.exibicaoBotoes();
  }

  //Adiciona ou remove dos favoritos
  addOrRemoveFavoritos() {
    if (this.dadosDemanda.codigoDemanda)
      this.demandaService.addFavoritos(this.dadosDemanda.codigoDemanda)
        .subscribe({
          next: e => {
            this.isFavorita = !this.isFavorita;
          }, error: err => {
            alert("Erro ao adicionar a favorita")
          }
        })
  }
}
