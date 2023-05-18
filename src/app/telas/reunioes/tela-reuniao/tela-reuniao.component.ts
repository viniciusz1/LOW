import { ModalCancelamentoReuniaoComponent } from './../../../modais/modal-cancelamento-reuniao/modal-cancelamento-reuniao.component';
import { ModalCriarReuniaoComponent } from './../../../modais/modal-criar-reuniao/modal-criar-reuniao.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TelaCalendarioComponent } from './../tela-calendario/tela-calendario.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Reuniao } from 'src/app/models/reuniao.model';
import { fadeAnimation } from './../../../shared/app.animation';
import { textoTutorial } from 'src/app/shared/textoDoTutorial';
import { ReuniaoService } from 'src/app/services/reuniao.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-reuniao.component.html',
  styleUrls: ['./tela-reuniao.component.scss'],
  animations: [fadeAnimation]
})

export class TelaReuniaoComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    public matDialog: MatDialog,
    private messageService: MessageService,
    private reuniaoService: ReuniaoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }
  opcoesOrdenacao = [{ name: 'Data', value: 'data' }, { name: 'Comissão', value: 'comissao' }]
  ordenarSelect = ""
  //tipoExibicao = true --> mostrar todas reuniões
  //tipoExibicao = false --> Cria nova pauta
  textoTutorial = textoTutorial
  showPesquisaEBotaoFiltro = true;
  dataReuniao: any;
  comissaoSelecionada: any;
  pesquisaDemanda: string = "";
  listaReunioes: Reuniao[] = [];
  showSidebar = -350;
  pesquisaReuniao = "";
  mostrarBotaoModal = false;
  showFiltroComponent = false;

  modalDeConfirmacaoCancelamentoDemanda(reuniao: Reuniao) {
    this.matDialog.open(ModalCancelamentoReuniaoComponent, {
      minWidth: '300px',
      data: reuniao.codigoReuniao
    });
  }

  modalMotivoCancelamentoDemanda(reuniao: Reuniao) {
    this.mostrarBotaoModal = true;
    this.confirmationService.confirm({
      blockScroll: false,
      closeOnEscape: false,
      dismissableMask: true,
      header: 'Motivo do Cancelamento',
      message: reuniao.motivoCancelamentoReuniao,
      accept: () => {
        //Actual logic to perform a confirmation
      },
    });
  }

  openModalCriarReuniao() {
    this.matDialog.open(ModalCriarReuniaoComponent, {
      minHeight: '',
    }).afterClosed().subscribe((reuniao: Reuniao | undefined) => {
      if(reuniao){
        //verificar se ja existe
        const index = this.listaReunioes.findIndex(e => e.codigoReuniao === reuniao.codigoReuniao);

        if (index !== -1) {
          // Substituir a reunião existente
          this.listaReunioes[index] = reuniao;
        } else {
          this.atualizarReunioes();
        }


      }
    })
  }

  openCalendario() {
    this.matDialog.open(TelaCalendarioComponent, {
      minWidth: '60vw',
      data: this.listaReunioes
    });
  }

  ngOnInit() {
    // this.openModalCriarReuniao();
    this.atualizarReunioes();
  }

  atualizarReunioes() {
    this.reuniaoService
      .getReuniao()
      .subscribe({
        next: reuniao => {
          this.listaReunioes = reuniao
        }, error: err => {
          this.showError("Não foi possível atualizar esta reunião")
        }
      });
  }
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }



  pesquisarReunioes(event: {
    nomeComissao: string;
    dataReuniao: string;
    statusReuniao: string;
    ppmProposta: string;
    analista: string;
    solicitante: string;
    page: string;
    size: string
  }){
      this.reuniaoService.getReuniaoFiltrada(event).subscribe({
        next: reuniao => {
          this.listaReunioes = reuniao
        }, error: err => {
          this.showError("Não foi possível mostrar as reuniões!")
        }
      });
  }

  moveSidebar() {
    if (this.showSidebar == 0) {
      this.showSidebar = -350;
    } else {
      this.showSidebar = 0;
    }
  }
}
