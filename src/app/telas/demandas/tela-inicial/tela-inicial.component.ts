import { FalarTextoService } from './../../../services/falar-textos.service';
import { RascunhoService } from './../../../services/rascunho.service';
import { Filtro } from './../../../models/filtro.model';
import { DemandaExcel } from './../../../models/demandaExcel.model';
import { ModalAtaDocumentoComponent } from './../../../modais/modal-ata-documento/modal-ata-documento.component';
import { ModalCriarReuniaoComponent } from './../../../modais/modal-criar-reuniao/modal-criar-reuniao.component';
import { fadeAnimation } from './../../../shared/app.animation';
import { StatusDemanda } from './../../../models/statusDemanda.enum';
import { ModalReprovacaoDemandaComponent } from './../../../modais/modal-reprovacao-demanda/modal-reprovacao-demanda.component';
import { Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { MatDialog } from '@angular/material/dialog';
import { textoTutorial } from '../../../shared/textoDoTutorial';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModalHistoricoComponent } from 'src/app/modais/modal-historico/modal-historico.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss'],
  animations: [fadeAnimation],
})


export class TelaInicialComponent implements OnInit {
  constructor(
    public dialog: Dialog,
    private matDialog: MatDialog,
    private demandasService: DemandaService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private rascunhoService: RascunhoService,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private falarTextoService: FalarTextoService
  ) {
    //Pipe ativado quando é realizado algum tipo de filtro por campo de texto
    this.pesquisaAlterada.pipe(debounceTime(500)).subscribe(() => {
      if (this.pesquisaDemanda == "") {
        this.carregarDemandasIniciais()
      } else {
        this.pesquisarDemandas({ status: undefined, pesquisaCampo: this.pesquisaDemanda });
      }
      if (router.url == '/tela-inicial/rascunhos') {
        this.tipoRascunho = true;
        this.isFiltrado = true;
      };
    })
    //Setando nivel de acesso usuário e departamento
    this.nivelAcessoUsuario = usuarioService.getRole
    this.departamentoUsuario = usuarioService.getDepartamento
  }
  //Utilizado para realizar o calculo dos cards que se movimentam para o lado
  @ViewChild('tamanhoDaFila') tamanhoDaFila: ElementRef | undefined;


  @Input() rascunho: boolean = false;
  ordenarSelect = '';
  opcoesOrdenacao = [
    { name: 'Data de criação ↑', value: '1' },
    { name: 'Data de criação ↓', value: '2' },
    { name: 'Maior Score', value: '3' },
    { name: 'A-Z', value: '4' },
    { name: 'Z-A', value: '5' },
  ];
  departamentoUsuario?= ''
  nivelAcessoUsuario?= ''
  totalPagesPagination = 0
  pesquisaAlterada = new Subject<string>();
  textoTutorial = textoTutorial;
  positionListCards: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  //true = card
  tipoExibicaoDemanda = true;
  cabecalhoMensagemDeConfirmacao = 'Avançar status';
  isCollapsed: boolean[] = [true, true, true, true, true, true, true, true, true];
  isFiltrado = false;
  showFiltro = false;
  showPesquisaEBotaoFiltro = true;
  showSidebar = -350;
  listaDemandas: Demanda[] = [];
  demandasVazias: boolean = false;
  divScrollCircle: boolean = false;
  tipoRascunho = false;
  isFirstIfExecuted: boolean = false;
  listaTituloNaoFiltrado: { status: string; titulo: string }[] = [];
  qtdDemandasStatus: number[] = []
  pesquisaDemanda = '';
  nenhumResultadoEncontrado = false;
  mudouCampodePesquisa() {
    this.pesquisaAlterada.next(this.pesquisaDemanda as string);
  }
  //Pesquisa demandas por status, pelo campo de pesquisa pequeno, ou por todos os campos, no caso do filtro especializado
  pesquisarDemandas(pesquisaEspecial: { status: string | undefined, pesquisaCampo: string | undefined } | string | undefined) {
    this.demandasService
      .getDemandasFiltradas(pesquisaEspecial)
      .subscribe((listaDemandas: Demanda[]) => {
        console.log(listaDemandas)
        if (listaDemandas.length > 0) {
          this.totalPagesPagination = this.demandasService.totalPages
          this.listaDemandas = listaDemandas;
          this.isFiltrado = true;
          this.nenhumResultadoEncontrado = false;
        } else {
          this.isFiltrado = true;
          this.listaDemandas = [];
          this.nenhumResultadoEncontrado = true;
        }
      });

  }

  ordenar(sort: { name: string, value: number }) {
    console.log(this.demandasService.getFiltroData)
    let filtro: Filtro;
    if (this.demandasService.getFiltroData) {
      filtro = this.demandasService.getFiltroData;
      filtro.sort = sort.value;
    } else {
      filtro =
      {
        solicitante: "",
        codigoDemanda: "",
        status: "",
        tamanho: "",
        tituloDemanda: "",
        analista: "",
        departamento: "",
        sort: sort.value,
      };
    }
    this.demandasService.setFiltroData = filtro;
    this.pesquisarDemandas(undefined);
  }

  paginate(event: { page: number }) {
    this.demandasService.avancarPage(event.page)
      .subscribe((listaDemandas: Demanda[]) => {
        if (listaDemandas.length > 0) {
          this.listaDemandas = listaDemandas;
          this.isFiltrado = true;
          this.nenhumResultadoEncontrado = false;
        } else {
          this.isFiltrado = true;
          this.listaDemandas = [];
          this.nenhumResultadoEncontrado = true;
        }
      });
  }

  exportExcel() {
    //Realiza o mesmo filtro que está salvo no serviço de demandas
    //porém sem a paginação, logo, retornando todas as demandas filtradas
    this.demandasService
      .getTodasAsDemandasFiltradas()
      .subscribe((listaDemandas: any) => {
        // Importa o xlsx e exporta para excel
        import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(listaDemandas['content']);
          const workbook = {
            Sheets: { data: worksheet },
            SheetNames: ['data'],
          };
          const excelBuffer: any = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
          });
          this.saveAsExcelFile(excelBuffer, 'filtragem de demandas - ');
        });
      });
  }

  //Salva o arquivo excel
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  //Inicia e direciona o usuário para a tela de chat caso ele seja o analista da demanda
  irParaChat(event: Event, demanda: Demanda) {
    if (event.target && demanda.analista?.codigoUsuario == undefined) {
      this.confirmationService.confirm({
        target: event.target,
        message: 'Deseja realmente iniciar uma conversa sobre esta demanda?',
        icon: 'pi pi-exclamation-triangle',
        blockScroll: false,
        accept: () => {
          this.demandasService.iniciarConversa(demanda.codigoDemanda)
            .subscribe({
              next: (e) => {
                this.router.navigate(['/tela-inicial/chat/' + demanda.codigoDemanda]);
              }
              , error: (err) => { console.log(err) }
            })

        },
        reject: () => {

        }
      });
    }
    else {
      this.router.navigate(['/tela-inicial/chat/' + demanda.codigoDemanda]);
    }
  }

  //Lógica para mover as demandas da tela inicial para a direita
  changeRight(index: number) {
    let tamanhoDaListaCompleta = (
      document.getElementById(`filaCompleta${index}`) as HTMLElement
    ).offsetWidth;

    if (
      this.positionListCards[index] >
      -tamanhoDaListaCompleta + this.tamanhoDaFila?.nativeElement.offsetWidth
    ) {
      this.positionListCards[index] -= 397 * 2;
    }
  }
  //Lógica para mover as demandas da tela inicial para a esquerda
  changeLeft(index: number) {
    if (this.positionListCards[index] < 0) {
      this.positionListCards[index] += 397 * 2;
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
  //Abre e fecha o sidebar lateral esquerdo
  moveSidebar() {
    if (this.showSidebar == 0) {
      this.showSidebar = -350;
    } else {
      this.showSidebar = 0;
    }
  }

  //Abre modal de reprovação de demanda
  openModalReprovacaoDemanda(demanda: Demanda) {
    this.matDialog.open(ModalReprovacaoDemandaComponent,
      {
        maxWidth: '70vw',
        minWidth: '50vw',
        data: demanda
      });
  }

  //Abre modal de documento da demanda
  openModalDemandaDocumento(event: Demanda) {
    this.matDialog
      .open(ModalDemandaDocumentoComponent, {
        maxWidth: '70vw',
        minWidth: '50vw',
        data: event,
      })
      .afterClosed().subscribe({
        next: e => {
          let indice: number | undefined = -1
          if (this.listaDemandas) {
            indice = this.listaDemandas.findIndex(p => p.codigoDemanda == e.codigoDemanda);
            if (indice !== -1) {
              this.listaTituloNaoFiltrado = [];
              this.listaDemandas.splice(indice, 1, e);
              this.exibirFilasDeStatus()
            }
          }
        }
      })

  }
  //Abre modal de reprovação de histórico
  openModalHistorico(codigoDemanda: string) {
    this.matDialog.open(ModalHistoricoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      minHeight: '30vh',
      data: codigoDemanda
    });
  }

  //Abre modal de criar reunião
  openModalCriarReuniao(demanda: Demanda) {
    this.matDialog.open(ModalCriarReuniaoComponent, {
      minWidth: '300px',
      data: demanda,
    });
  }

  //Abre modal de ata
  openModalAtaDocumento() {
    this.matDialog.open(ModalAtaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }

  //Abre modal que vai atualizar o status da demanda
  avancarStatusDemanda(info: {
    mensagem: string;
    codigoDemanda: string | undefined;
    statusDemanda: StatusDemanda | undefined;
  }) {
    this.cabecalhoMensagemDeConfirmacao = 'Avançar status';
    this.confirmationService.confirm({
      dismissableMask: true,
      blockScroll: false,
      message: info.mensagem,
      accept: () => {
        if (info.codigoDemanda != undefined) {
          this.demandasService
            .avancarStatusDemandaComDecisao(info.codigoDemanda, 1)
            .subscribe({
              next: () => {
                this.showSuccess("Status avançado com Sucesso!")
                this.carregarDemandasIniciais();
              },
              error: () => {
                this.showError("Não foi possível avançar o status da demanda!")
              },
            });
        }
      },
    });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



  //Verifica o status da demanda, adiciona o título e o status na lista de títulos


  mudarStatusFiltro() {
    this.showFiltro = !this.showFiltro;
    if (!this.showFiltro) {
      setTimeout(() => {
        this.showPesquisaEBotaoFiltro = !this.showPesquisaEBotaoFiltro;
      }, 200);
    } else {
      this.showPesquisaEBotaoFiltro = !this.showPesquisaEBotaoFiltro;
    }
  }


  //Método que carrega as demandas inciais dependendo do nível de acesso do usuário
  carregarDemandasIniciais() {
    this.listaDemandas = [];
    this.listaTituloNaoFiltrado = [];
    if (this.nivelAcessoUsuario == 'Analista' || this.nivelAcessoUsuario == 'GestorTI') {
      this.demandasService.getDemandasTelaInicial().subscribe({
        next: (e) => {
          e['demandas'].forEach((demandas: Demanda[]) => {
            if (demandas.length > 0) {
              this.listaDemandas.push(...demandas);
              this.isFiltrado = false;
              this.nenhumResultadoEncontrado = false;
            }
          });
          e['qtdDemandas'].forEach((qtd: number) => {
            if(qtd > 0){
              this.qtdDemandasStatus.push(qtd)
            }
          })

          this.exibirFilasDeStatus();
        },
        error: (err) => {
          this.showError("Não foi possível carregar as demandas!")
        },
      });
    } else if (this.nivelAcessoUsuario == 'Solicitante' || this.nivelAcessoUsuario == 'GerenteNegocio') {
      this.demandasService.getDemandasTelaInicialByDepartamento().subscribe({
        next: (demandas) => {
          if (demandas.length > 0) {
            console.log("divscroll 1 " , this.divScrollCircle)
            this.listaDemandas.push(...demandas);
            this.isFiltrado = false;
            this.isFirstIfExecuted = true;
            this.divScrollCircle = false;
            this.nenhumResultadoEncontrado = false;
          }

          if(!this.isFirstIfExecuted && demandas.length == 0) {
            console.log("divscroll 2 " , this.divScrollCircle)
            this.divScrollCircle = true;
            setTimeout(() => {
              this.demandasVazias = true;
            }, 5000)
          }
          this.exibirFilasDeStatus();
        },
        error: (err) => {
          this.showError("Não foi possível carregar as demandas!")
        },
      });
    }

  }

  //Abre o modal do motivo de reprovação da demanda
  openModalMotivoReprovacao(demanda: Demanda) {
    this.confirmationService.confirm({
      dismissableMask: true,
      key: 'motivoReprovacao',
      header: 'Motivo da Reprovação',
      blockScroll: false,
      message:
        demanda.motivoReprovacaoDemanda,
      accept: () => {
        this.router.navigate(['/tela-inicial/reformular-demanda/' + demanda.codigoDemanda])
      },
    });
  }

  ngOnInit(): void {
    // this.listaDemandas = listaDemandas
    this.carregarDemandasIniciais();
  }

  //Lógica para a criação de uma nova demanda
  criarUmaNovaDemanda() {
    this.rascunhoService.postRascunhoDemanda().subscribe((rascunho) => {
      console.log("entrou")
      this.router.navigate(['tela-inicial/rascunho/' + rascunho.codigoDemanda])
    })
    // let quantidadeRascunhos = this.rascunhoService.getSizeRascunho
    // if (quantidadeRascunhos == -1 || quantidadeRascunhos == undefined) {
    //   this.router.navigate(['tela-inicial/rascunho/' + 0])
    // } else {
    //   this.router.navigate(['tela-inicial/rascunho/' + quantidadeRascunhos])
    // }
  }


  //Lógica para a exibição das fileiras de status da tela inicial
  //o pipe de filtrar-demandas está associado a essa lógica
  exibirFilasDeStatus() {
    
      if (this.listaDemandas.some((e) => e.solicitanteDemanda?.codigoUsuario == this.usuarioService.getCodigoUser())) {
        this.listaTituloNaoFiltrado.push({
          status: 'SUAS_DEMANDAS',
          titulo: 'Suas Demandas',
        });
      }else {
        this.listaTituloNaoFiltrado.push({
          status: 'Sem demandas',
          titulo: 'Sem demandas',
        });
      }
    if (this.nivelAcessoUsuario == 'Solicitante') {
      this.listaTituloNaoFiltrado.push({
        status: 'DEMANDAS_DEPARTAMENTO',
        titulo: 'Demandas do Seu Departamento',
      });


      return
    }

    if (this.nivelAcessoUsuario == 'GerenteNegocio') {
      if (this.listaDemandas.some((e) => e.statusDemanda?.toString() == 'BACKLOG_APROVACAO')) {
        this.listaTituloNaoFiltrado.push({
          status: 'BACKLOG_APROVACAO',
          titulo: 'Suas Tarefas',
        });
      }
      // else{
      //   this.listaTituloNaoFiltrado.push({
      //     status: 'Sem demandas',
      //     titulo: 'Sem demandas',
      //   });
      // }


      this.listaTituloNaoFiltrado.push({
        status: 'DEMANDAS_DEPARTAMENTO',
        titulo: 'Demandas do Seu Departamento',
      });



      return
    }

    // if (this.rascunhoService.getRascunhosDemanda.length > 0) {
    //   this.listaTituloNaoFiltrado.push({
    //     status: 'DRAFT',
    //     titulo: 'Seus Rascunhos',
    //   });
    // }
    if (
      this.listaDemandas.some(
        (e) => e.statusDemanda?.toString() == 'BACKLOG_CLASSIFICACAO'
      )
    ) {
      this.listaTituloNaoFiltrado.push({
        status: 'BACKLOG_CLASSIFICACAO',
        titulo: 'Backlog - Classificação',
      });
    }
    if (
      this.listaDemandas.some(
        (e) => e.statusDemanda?.toString() == 'BACKLOG_APROVACAO'
      )
    ) {
      this.listaTituloNaoFiltrado.push({
        status: 'BACKLOG_APROVACAO',
        titulo: 'Backlog - Aprovação',
      });
    }
    if (
      this.listaDemandas.some(
        (e) => e.statusDemanda?.toString() == 'BACKLOG_PROPOSTA'
      )
    ) {
      this.listaTituloNaoFiltrado.push({
        status: 'BACKLOG_PROPOSTA',
        titulo: 'Backlog - Propostas',
      });
    }
    if (
      this.listaDemandas.some(
        (e) => e.statusDemanda?.toString() == 'BUSINESS_CASE'
      )
    ) {
      this.listaTituloNaoFiltrado.push({
        status: 'BUSINESS_CASE',
        titulo: 'Business Case',
      });
    }
    if (
      this.listaDemandas.some(
        (e) => e.statusDemanda?.toString() == 'ASSESSMENT'
      )
    ) {
      this.listaTituloNaoFiltrado.push({
        status: 'ASSESSMENT',
        titulo: 'Assessment',
      });
    }
    if (this.listaDemandas.some((e) => e.statusDemanda?.toString() == 'DISCUSSION')) {
      this.listaTituloNaoFiltrado.push({ status: 'DISCUSSION', titulo: 'Discussion' });
    }
    if (this.listaDemandas.some((e) => e.statusDemanda?.toString() == 'TO_DO')) {
      this.listaTituloNaoFiltrado.push({ status: 'TO_DO', titulo: 'To Do' });
    }
    if (this.listaDemandas.some((e) => e.statusDemanda?.toString() == 'DESIGN_AND_BUILD')) {
      this.listaTituloNaoFiltrado.push({
        status: 'DESIGN_AND_BUILD',
        titulo: 'Design and Build',
      });
    }
    if (
      this.listaDemandas.some((e) => e.statusDemanda?.toString() == 'SUPPORT')
    ) {
      this.listaTituloNaoFiltrado.push({
        status: 'SUPPORT',
        titulo: 'Support',
      });
    }
    if (
      this.listaDemandas.some((e) => e.statusDemanda?.toString() == 'CANCELLED')
    ) {
      this.listaTituloNaoFiltrado.push({
        status: 'CANCELLED',
        titulo: 'Cancelled',
      });
    }
    if (this.listaDemandas.some((e) => e.statusDemanda?.toString() == 'DONE')) {
      this.listaTituloNaoFiltrado.push({ status: 'DONE', titulo: 'Done' });
    }
  }

}
