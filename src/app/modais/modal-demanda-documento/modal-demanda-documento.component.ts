import { path } from './../../services/path/rota-api';

import { Arquivo } from './../../models/arquivo.model';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MessageService, PrimeIcons } from 'primeng/api';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Tamanho } from 'src/app/models/tamanho.enum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalReprovacaoDemandaComponent } from '../modal-reprovacao-demanda/modal-reprovacao-demanda.component';
import { Proposta } from 'src/app/models/proposta.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';

@Component({
  selector: 'app-modal-demanda-documento',
  templateUrl: './modal-demanda-documento.component.html',
  styleUrls: ['./modal-demanda-documento.component.scss'],
})
export class ModalDemandaDocumentoComponent implements OnInit {
  showbotoesAprovarDemanda = false;
  showTimeline = false;
  path = path
  constructor(
    @Inject(DIALOG_DATA) public data: Demanda,
    private demandaService: DemandaService,
    private dialogRef: MatDialogRef<ModalDemandaDocumentoComponent>,
    private matDialog: MatDialog,
    private messageService: MessageService,
    private usuarioService: UsuarioService) {
    this.dadosDemanda = data
    this.usuarioService.verificarTokenUserDetailsReturn()
      .subscribe({
        next: e => {
          if (e.usuario.nivelAcessoUsuario == 'GestorTI' && this.dadosDemanda?.statusDemanda == StatusDemanda.BACKLOG_APROVACAO) {
            this.showbotoesAprovarDemanda = true
          }
          if (e.usuario.nivelAcessoUsuario == 'Solicitante') {
            this.showTimeline = true
            this.configureTimeline()
          }
          this.showbotoesAprovarDemanda = true

        }, error: err => {
          this.showError("Não foi possível verificar o Token")
        }
      })
  }
  @Input() dadosDemanda: Demanda | undefined;
  @Input() documentoEmAta = false;


  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


  configureTimeline() {
    if (this.dadosDemanda?.statusDemanda) {
      let ordinalStatus = Object.keys(StatusDemanda).indexOf(this.dadosDemanda.statusDemanda);
      if(ordinalStatus == 0){
        this.timeline[0].color == "#00579D"
      }else if(ordinalStatus > 0 && ordinalStatus < 3){
        this.timeline[0].color == "#00579D"
        this.timeline[1].color == "#00579D"
      }else if(ordinalStatus > 0 && ordinalStatus < 3){
        this.timeline[0].color == "#00579D"
        this.timeline[1].color == "#00579D"
      }else if(ordinalStatus > 0 && ordinalStatus < 3){
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
    this.matDialog.open(ModalReprovacaoDemandaComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: this.dadosDemanda
    });
  }

  download(arquivo: Arquivo): void {
    this.demandaService.saveByteArray(
      arquivo.dadosArquivo,
      arquivo.tipoArquivo,
      arquivo.nomeArquivo
    );
  }

  timeline: {status: string, date: string, icon: string, color: string, fontWeight: string}[] = [
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
