import { path } from './../../services/path/rota-api';

import { Arquivo } from './../../models/arquivo.model';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Tamanho } from 'src/app/models/tamanho.enum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalReprovacaoDemandaComponent } from '../modal-reprovacao-demanda/modal-reprovacao-demanda.component';
import { Proposta } from 'src/app/models/proposta.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router';
import { ModalRecomendacaoDemandaComponent } from '../modal-recomendacao-demanda/modal-recomendacao-demanda.component';

@Component({
  selector: 'app-modal-demanda-documento',
  templateUrl: './modal-demanda-documento.component.html',
  styleUrls: ['./modal-demanda-documento.component.scss'],
})
export class ModalDemandaDocumentoComponent implements OnInit {

  showbotoesAprovarDemanda = false;
  showTimeline = false;
  path = path
  custosTotais: number = 0;

  @Input() dadosDemanda: Demanda | undefined;
  @Input() documentoEmAta = false;

  constructor(
    @Inject(DIALOG_DATA) public data: Demanda,
    private demandaService: DemandaService,
    private dialogRef: MatDialogRef<ModalDemandaDocumentoComponent>,
    private matDialog: MatDialog,
    private confirmationService: ConfirmationService,
    private modalService: ModalService,
    private messageService: MessageService,
    private usuarioService: UsuarioService) {

    this.dadosDemanda = data
    this.custosTotais = 0
    if (this.dadosDemanda.recursosProposta) {
      this.dadosDemanda.recursosProposta
        .forEach(recurso => {
          this.custosTotais += recurso.valorHoraRecurso * recurso.quantidadeHorasRecurso;
        })
    }

    this.usuarioService.verificarTokenUserDetailsReturn()
      .subscribe({
        next: e => {
          if ((e.usuario.nivelAcessoUsuario == 'GestorTI' || e.usuario.nivelAcessoUsuario == 'GerenteNegocio') && this.dadosDemanda?.statusDemanda == StatusDemanda.BACKLOG_APROVACAO) {
            if (!this.dadosDemanda.isHistorico) {
              this.showbotoesAprovarDemanda = true
            }
          }
          if (e.usuario.nivelAcessoUsuario == 'Solicitante') {
            this.showTimeline = true
            this.configureTimeline()
          }
        }, error: err => {
          this.showError("Não foi possível verificar o Token")
        }
      })
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  configureTimeline() {
    if (this.dadosDemanda?.statusDemanda) {
      let ordinalStatus = Object.keys(StatusDemanda).indexOf(this.dadosDemanda.statusDemanda);
      if (ordinalStatus == 0) {
        this.timeline[0].color == "#00579D"
      } else if (ordinalStatus > 0 && ordinalStatus < 3) {
        this.timeline[0].color == "#00579D"
        this.timeline[1].color == "#00579D"
      } else if (ordinalStatus > 0 && ordinalStatus < 3) {
        this.timeline[0].color == "#00579D"
        this.timeline[1].color == "#00579D"
      } else if (ordinalStatus > 0 && ordinalStatus < 3) {
        this.timeline[0].color == "#00579D"
        this.timeline[1].color == "#00579D"
      }

    }
  }

  enviarDecisao(decisao: number) {
    if (this.dadosDemanda?.codigoDemanda || this.dadosDemanda?.codigoDemanda == '0') {
      this.demandaService
        .avancarStatusDemandaComDecisao(
          this.dadosDemanda.codigoDemanda,
          decisao
        )
        .subscribe({
          next: event => {
            this.showSuccess("Decisão enviada!")
            this.dialogRef.close(event)
          },
          error: err => {
            this.showError("Decisão não enviada!")
          }
        });
    }
  }

  openModalReprovacao() {
    this.modalService.dialogRefDemandaDocumento = this.dialogRef;
    this.matDialog.open(ModalReprovacaoDemandaComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: this.dadosDemanda
    })
  }

  confirmarRecomendacao() {
    this.modalService.dialogRefDemandaDocumento = this.dialogRef;
    this.matDialog.open(ModalRecomendacaoDemandaComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: this.dadosDemanda
    })
  }

  confirmarDecisao() {
    this.confirmationService.confirm({
      dismissableMask: true,
      key: 'confirmarDecisao',
      header: 'Aprovar Demanda',
      blockScroll: false,
      message: 'Tem certeza de que realmente deseja aprovar essa demanda?',
      accept: () => {
        this.enviarDecisao(1)
      },
    });
  }


  timeline: { status: string, date: string, icon: string, color: string, fontWeight: string }[] = [
    {
      status: 'Reserva',
      date: '15/10/2020 10:30',
      icon: PrimeIcons.HOURGLASS,
      color: '#00579D',
      fontWeight: '600',
    },
    {
      status: 'Avaliação',
      date: '15/10/2020 14:00',
      icon: PrimeIcons.ELLIPSIS_H,
      color: '#c9c9c9',
      fontWeight: '100',
    },
    {
      status: 'Negociação',
      date: '15/10/2020 16:15',
      icon: PrimeIcons.CHART_BAR,
      color: '#c9c9c9',
      fontWeight: '100',
    },
    {
      status: 'Execução',
      date: '16/10/2020 10:00',
      icon: PrimeIcons.EJECT,
      color: '#c9c9c9',
      fontWeight: '100',
    },
    {
      status: 'Projeção',
      date: '16/10/2020 10:00',
      icon: PrimeIcons.CHART_PIE,
      color: '#c9c9c9',
      fontWeight: '100',
    },
    {
      status: 'Concluído',
      date: '16/10/2020 10:00',
      icon: PrimeIcons.CHECK,
      color: '#c9c9c9',
      fontWeight: '100',
    },
  ];

  ngOnInit() {
  }
}
