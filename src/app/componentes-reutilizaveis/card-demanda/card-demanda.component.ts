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

@Component({
  selector: 'app-card-demanda',
  templateUrl: './card-demanda.component.html',
  styleUrls: ['./card-demanda.component.scss'],
  providers: [NgbDropdownConfig],
})
export class CardDemandaComponent implements OnInit {
  @Output() abrirModalMotivoReprovacao = new EventEmitter<Demanda>();
  @Output() abrirModalAvaliarDemanda = new EventEmitter();
  @Output() abrirModalParecerComissao = new EventEmitter<Demanda>();
  @Output() abrirModalReprovar = new EventEmitter<Demanda>()
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

  @Input() mudarTamanho: string = '390px';
  @Input() isPauta: boolean = false;
  @Input() dadosDemanda: Demanda = {};
  @Input() rascunho: boolean = false;
  @Input() exibirBotaoParecerComissao: boolean = false;
  @Input() exibirBotaoParecerDg: boolean = false;
  @Input() tipoDeAta: string = '';
  @Input() mostrarBotao = true

  textoExibidoEmBotaoDependendoRota:
    | { rota: string; texto: string }
    | undefined = undefined;
  primaryColorClass?: string = '';
  secondaryColorClass: string = '';

  constructor(private route: Router,
    private confirmationService: ConfirmationService,
    private rascunhoService: RascunhoService,
    private usuarioService: UsuarioService,
    private messageService: MessageService) {
     }

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
  exibirIniciarChat() {

    if (this.dadosDemanda.solicitanteDemanda?.codigoUsuario == this.usuarioService.getCodigoUser()) {
      return true;
    }
    else if (this.usuarioService.getRole == NivelAcesso.GestorTI || this.usuarioService.getRole == NivelAcesso.Analista) {

      if (this.dadosDemanda.analista == undefined) {
        return true;
      }
      //Se um outro analista já tiver iniciado a conversa, não exibe o botão
      else if (this.dadosDemanda.analista?.codigoUsuario == this.usuarioService.getCodigoUser()) {
        return true;
      }
      else if (this.dadosDemanda.analista?.codigoUsuario != this.usuarioService.getCodigoUser()) {
        return false;
      }
    }
    return false;
  }

  formatarNumero(numero: number | undefined, casasDecimais: number): string {
    return numero !== undefined ? numero.toFixed(casasDecimais) : '';
  }

  retornaProximoStatusDemanda(statusDemanda: StatusDemanda | undefined) {
    switch (statusDemanda) {
      case StatusDemanda.BACKLOG_CLASSIFICACAO: return StatusDemanda.BACKLOG_APROVACAO
      case StatusDemanda.BACKLOG_APROVACAO: return StatusDemanda.BACKLOG_PROPOSTA
      case StatusDemanda.BACKLOG_PROPOSTA: return StatusDemanda.ASSESSMENT
      case StatusDemanda.ASSESSMENT: return StatusDemanda.DISCUSSION
      case StatusDemanda.BUSINESS_CASE: return StatusDemanda.DISCUSSION
      case StatusDemanda.DISCUSSION: return StatusDemanda.TO_DO
      case StatusDemanda.TO_DO: return StatusDemanda.DESIGN_AND_BUILD
      case StatusDemanda.DESIGN_AND_BUILD: return StatusDemanda.SUPPORT;
      case StatusDemanda.SUPPORT: return StatusDemanda.DONE;
      case StatusDemanda.DONE: return StatusDemanda.DONE;
      default: return 0
    }
  }
  abrirModalHistorico() {
    console.log("Clicou no modal");

    this.modalHistorico.emit(this.dadosDemanda.codigoDemanda)
  }

  porcentagemBarraProgressao() {
    switch (this.dadosDemanda.statusDemanda) {
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

  versaoSolicitante() {
    if (this.usuarioService.getRole == "Solicitante") {
      return true;
    }
    return false;
  }

  mostrarCancelarPropriaDemanda() {
    if (this.usuarioService.getCodigoUser() == this.dadosDemanda.solicitanteDemanda?.codigoUsuario) {
      return true
    }
    return false;
  }

  confirmarChat() {
    this.confirmationService.confirm({
      message: 'Deseja realmente iniciar esta conversa?',
      dismissableMask: true,
      header: 'Iniciar Chat',
      accept: () => {
        this.route.navigate(["/tela-inicial/chat"]);
      }
    })
  };

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
      case '': this.abrirModalMotivoReprovacao.emit(this.dadosDemanda);
        break;
      case 'ABRIR_MODAL_AVALIAR': this.verDocumentoProposta.emit(this.dadosDemanda);
        break;
      case 'MODAL_ADD_REUNIAO': this.abrirModalCriarReuniao.emit(this.dadosDemanda);
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
      case 'VER_DOCUMENTO': this.verDocumentoProposta.emit(this.dadosDemanda);
        break;
      case 'PARECER_COMISSAO': this.abrirModalParecerComissao.emit(this.dadosDemanda);
        break;
      default:
        //Caso não tenha uma função pré-definida, vai para a rota atrelada ao botão
        this.route.navigate([this.textoExibidoEmBotaoDependendoRota?.rota]);
    }
  }

  exibicaoBotoes() {
    const nivelAcesso = this.usuarioService.getRole
    //Caso o usuário não tenha permissão de ação na demanda, ele poderá ve-la
    this.textoExibidoEmBotaoDependendoRota = {
      rota: 'VER_DOCUMENTO',
      texto: 'Ver Demanda',
    };
    //Caso o card seja definido que não precisa mostrar o botão
    if (!this.mostrarBotao) {
      return false;
    }

    //Caso a rota não existir, é um comando para a função direcionarUsuario()
    switch (this.dadosDemanda.statusDemanda) {
      case StatusDemanda.BACKLOG_CLASSIFICACAO:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          if(nivelAcesso == 'GestorTI' || this.dadosDemanda.solicitanteDemanda?.codigoUsuario != this.usuarioService.getCodigoUser()){
          this.textoExibidoEmBotaoDependendoRota = {
            rota:
              '/tela-inicial/classificar-demanda/' + this.dadosDemanda.codigoDemanda,
            texto: 'Classificar Demanda',
          }
        }
        };
        return true;
      case StatusDemanda.BACKLOG_PROPOSTA:
          if(this.dadosDemanda.analista?.codigoUsuario != this.usuarioService.getCodigoUser()){
          this.textoExibidoEmBotaoDependendoRota = {
            rota: '/tela-inicial/proposta/' + this.dadosDemanda.codigoDemanda,
            texto: 'Criar Proposta'
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
      case StatusDemanda.TO_DO || StatusDemanda.DESIGN_AND_BUILD || StatusDemanda.SUPPORT:
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
        this.rascunho = true
        this.textoExibidoEmBotaoDependendoRota = {
          rota: 'tela-inicial/rascunho/' + this.dadosDemanda.codigoDemanda,
          texto: 'Continuar Demanda',
        };
        return true;
      default:
        if (this.exibirBotaoParecerComissao) {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'PARECER_COMISSAO',
            texto: 'Parecer Comissao',
          };
          return true;
        } else if (this.exibirBotaoParecerDg) {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'PARECER_DG',
            texto: 'Parecer da DG',
          };
        }
        return true;
    }
  }

  deleteRascunhoFromLocalStorage() {
    if (this.dadosDemanda.codigoDemanda) {
      this.showSuccess("Rascunho deletado!")
      // this.rascunhoService.deleteRascunho(this.dadosDemanda.codigoDemanda)
      this.clicouEmExcluir.emit()
    } else {
      this.showError("Não foi possível excluir o rascunho!")
    }
  }


  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

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
    this.primaryColorClass = this.dadosDemanda.statusDemanda;
    this.secondaryColorClass = this.dadosDemanda.statusDemanda + '-sec';

    this.exibicaoBotoes();
  }
}
