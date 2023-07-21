import { Router } from '@angular/router';
import { Output, Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { NivelAcesso } from 'src/app/models/nivel-acesso.enum';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PersonalizacaoService } from 'src/app/services/personalizacao.service';
import { Reuniao } from 'src/app/models/reuniao.model';
import { ReuniaoService } from 'src/app/services/reuniao.service';
import { DemandaService } from 'src/app/services/demanda.service';

@Component({
  selector: 'app-list-demanda',
  templateUrl: './list-demanda.component.html',
  styleUrls: ['./list-demanda.component.scss']
})


export class ListDemandaComponent implements OnInit {
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
  @Output() clicouAdicionarPauta = new EventEmitter();
  @Output() avancarStatusDemanda = new EventEmitter<{
    mensagem: string;
    codigoDemanda: string | undefined;
    statusDemanda: StatusDemanda | undefined;
  }>();

  @Input() mudarTamanho: string = '68vw';
  @Input() isPauta: boolean = false;
  @Input() dadosDemanda: Demanda = {};
  @Input() demandaEmReuniao: boolean = false;
  @Input() rascunho: boolean = false;
  @Input() tipoDeAta: string = '';
  @Input() mostrarBotao = true;
  @Input('mostrarIconeAdicionar') demandaPequena = false;


  mostrarIconeAdicionar = false;
  textoExibidoEmBotaoDependendoRota:
    | { rota: string; texto: string }
    | undefined = undefined;
  primaryColorClass?: string = '';
  secondaryColorClass: string = '';
  @Input() primaryColor?: string = '';
  @Input() secondaryColor: string = '';
  analistaAssociado: boolean = false;
  codigoReuniao: number | undefined;
  demandaEncontrada: boolean = false;
  motivoDemandaPropria = "Os motivos não foram disponibilizados";
  reunioes: Reuniao[] | undefined;

  constructor(private route: Router,
    public usuarioService: UsuarioService,
    private messageService: MessageService,
    private demandaService: DemandaService,
    private reuniaoService: ReuniaoService,
    private personalizacaoService: PersonalizacaoService) { }
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
  abrirModalHistorico() {
    console.log("clicou no historico");

    this.modalHistorico.emit(this.dadosDemanda.codigoDemanda)
  }

  exibirIniciarChat() {
    if (
      this.usuarioService.getRole == NivelAcesso.GestorTI ||
      this.usuarioService.getRole == NivelAcesso.Analista
    ) {
      if (
        this.dadosDemanda.solicitanteDemanda?.codigoUsuario ==
        this.usuarioService.getCodigoUser()
      ) {
        return false;
      }
    }
    return true;
  }

  formatarNumero(numero: number | undefined, casasDecimais: number): string {
    return numero !== undefined ? numero.toFixed(casasDecimais) : '';
  }

  mostrarCancelarPropriaDemanda() {
    if (this.usuarioService.getCodigoUser() == this.dadosDemanda.solicitanteDemanda?.codigoUsuario) {
      return true
    }
    return false;
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  retornaProximoStatusDemanda(statusDemanda: StatusDemanda | undefined) {
    if (statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO) {
      return StatusDemanda.BACKLOG_APROVACAO;
    } else if (statusDemanda == StatusDemanda.BACKLOG_APROVACAO) {
      return StatusDemanda.BACKLOG_PROPOSTA;
    } else if (statusDemanda == StatusDemanda.BACKLOG_PROPOSTA) {
      return StatusDemanda.ASSESSMENT;
    } else if (statusDemanda == StatusDemanda.ASSESSMENT) {
      return StatusDemanda.TO_DO;
    } else if (statusDemanda == StatusDemanda.BUSINESS_CASE) {
      return StatusDemanda.TO_DO;
    } else if (statusDemanda == StatusDemanda.TO_DO) {
      return StatusDemanda.DESIGN_AND_BUILD;
    } else if (statusDemanda == StatusDemanda.DESIGN_AND_BUILD) {
      return StatusDemanda.SUPPORT;
    } else if (statusDemanda == StatusDemanda.SUPPORT) {
      return StatusDemanda.DONE;
    } else if (statusDemanda == StatusDemanda.DONE) {
      return StatusDemanda.DONE;
    }
    return null;
  }

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

  existePauta() {
    if (
      this.dadosDemanda.statusDemanda == StatusDemanda.ASSESSMENT ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BUSINESS_CASE ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_CLASSIFICACAO ||
      this.dadosDemanda.statusDemanda == StatusDemanda.BACKLOG_PROPOSTA ||
      this.dadosDemanda.statusDemanda == StatusDemanda.CANCELLED
    ) {
      return false;
    }
    return true;
  }

  encaminharParaReuniao(codigoDemanda?: string) {
    this.reuniaoService.getReuniao().subscribe(reunioes => {
      this.reunioes = reunioes;
      this.procurarCodigoDemanda(codigoDemanda);
      if (this.demandaEncontrada) {
        this.route.navigate(['tela-inicial/ver-reuniao/' + this.codigoReuniao]);
      }
    });
  }

  procurarCodigoDemanda(codigoDemanda: string | undefined) {
    if (this.reunioes) {
      for (const reuniao of this.reunioes) {
        if (reuniao.propostasReuniao) {
          for (const demanda of reuniao.propostasReuniao) {
            if (demanda.codigoDemanda == codigoDemanda) {
              this.codigoReuniao = reuniao.codigoReuniao;
              this.demandaEncontrada = true;
              return;
            }
          }
        }
      }
    }
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

  exibicaoBotoes() {
    const nivelAcesso = this.usuarioService.getRole;
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
          // if (this.dadosDemanda.analista?.codigoUsuario != this.usuarioService.getCodigoUser()) {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'MODAL_ADD_REUNIAO',
            texto: 'Adicionar Proposta',
            // };
          };
        }
        return true;
      case StatusDemanda.BUSINESS_CASE:
        if (nivelAcesso == 'Analista' || nivelAcesso == 'GestorTI') {
          // if (this.dadosDemanda.analista?.codigoUsuario != this.usuarioService.getCodigoUser()) {
          this.textoExibidoEmBotaoDependendoRota = {
            rota: 'MODAL_ADD_REUNIAO',
            texto: 'Adicionar Proposta',
            // };
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

  getOrdinalValueStatusDemanda(value: StatusDemanda | undefined): number | undefined {
    const enumValues = Object.values(StatusDemanda);
    const index = enumValues.indexOf(value as StatusDemanda);
    return index !== -1 ? index : undefined;
  }
  ngOnInit(): void {

    if (this.personalizacaoService.personalizacaoAtiva.coresPrimariasPersonalizacao && this.personalizacaoService.personalizacaoAtiva.coresSecundariasPersonalizacao) {

      let ordinal = this.getOrdinalValueStatusDemanda(this.dadosDemanda.statusDemanda) as number
      this.primaryColor = this.personalizacaoService.personalizacaoAtiva.coresPrimariasPersonalizacao[ordinal]
      this.secondaryColor = this.personalizacaoService.personalizacaoAtiva.coresSecundariasPersonalizacao[ordinal]
    }

    this.primaryColorClass = this.dadosDemanda.statusDemanda;
    this.secondaryColorClass = this.dadosDemanda.statusDemanda + "-sec";

    //verifica se a demanda é favorita
    if (this.dadosDemanda.usuariosFavoritos) {
      for (let user of this.dadosDemanda.usuariosFavoritos) {
        if (user.codigoUsuario == this.usuarioService.getCodigoUser()) {
          this.isFavorita = true
        }
      }

    }


    this.exibicaoBotoes()
  }
  isFavorita = false;

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
