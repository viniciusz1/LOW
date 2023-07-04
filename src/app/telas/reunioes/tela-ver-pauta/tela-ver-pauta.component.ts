import { ConfirmationService } from 'primeng/api';
import { ModalCancelamentoReuniaoComponent } from './../../../modais/modal-cancelamento-reuniao/modal-cancelamento-reuniao.component';
import { ModalAtaDocumentoComponent } from './../../../modais/modal-ata-documento/modal-ata-documento.component';
import { ModalParecerComissaoPropostaComponent } from './../../../modais/modal-parecer-comissao-proposta/modal-parecer-comissao-proposta.component';
import { MatDialog } from '@angular/material/dialog';
import { DemandaService } from 'src/app/services/demanda.service';
import { Demanda } from 'src/app/models/demanda.model';

import { Component, OnInit } from '@angular/core';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ReuniaoService } from 'src/app/services/reuniao.service';
import { Reuniao } from 'src/app/models/reuniao.model';
import { Proposta } from 'src/app/models/proposta.model';
import { routerModuleForChild } from 'ngx-joyride';
import { ModalHistoricoComponent } from 'src/app/modais/modal-historico/modal-historico.component';
import { MessageService } from 'primeng/api';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { RascunhoService } from 'src/app/services/rascunho.service';
import { ModalCriarReuniaoComponent } from 'src/app/modais/modal-criar-reuniao/modal-criar-reuniao.component';
import { ModalDgDocumentosComponent } from 'src/app/modais/modal-dg-documentos/modal-dg-documentos.component';

@Component({
  selector: 'app-tela-ver-pauta',
  templateUrl: './tela-ver-pauta.component.html',
  styleUrls: ['./tela-ver-pauta.component.scss']
})
export class TelaVerPauta implements OnInit {

  constructor(private confirmationService: ConfirmationService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private reuniaoService: ReuniaoService,
    private messageService: MessageService,
    private demandaService: DemandaService,
    private router: Router) {
    this.reuniaoService.getReuniaoId(this.codigoReuniao)
      .subscribe({
        next: (x) => {
          this.reuniao = x
          this.mostrarBotoesReuniao();
        }
      })
  }

  codigoReuniao = this.activatedRoute.snapshot.params['codigoReuniao']
  reuniao: Reuniao | undefined = undefined;
  listaDemandas: Demanda[] = [];
  listaTituloNaoFiltrado: { status: string; titulo: string }[] = [];

  ngOnInit(): void {

  }

  download(): void {
    this.demandaService.saveByteArray(
      this.reuniao?.arquivoReuniao?.dadosArquivo as string,
      this.reuniao?.arquivoReuniao?.tipoArquivo as string,
      this.reuniao?.arquivoReuniao?.nomeArquivo as string
    );
  }
  mostrarAtaPublicada() {

    return this.reuniao?.propostasReuniao?.some(p => p.tipoAtaProposta == 'PUBLICADA')
  }

  mostrarAtaNaoPublicada() {
    return this.reuniao?.propostasReuniao?.some(p => p.tipoAtaProposta == 'NAO_PUBLICADA')
  }

  finalizarReuniao() {
    this.reuniaoService.finalizarReuniao(this.reuniao?.codigoReuniao)
      .subscribe({
        next: e => {
          this.router.navigate(['/tela-inicial/reunioes'])
        }, error: err => {
          this.showError("Não foi possível finalizar a reunião!")
        }
      })
  }

  openModalCriarReuniao() {
    this.matDialog.open(ModalCriarReuniaoComponent, {
      minWidth: '300px',
      data: this.reuniao
    }).afterClosed().subscribe({
      next: e => {
        if (e != undefined) {
          this.reuniao = e;
        }
      },
      error: err => {
        this.showError("Não foi possível editar dados!: " + err)
      }
    })
  }


  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  mostrarBotoesReuniao() {
    if (this.reuniao?.statusReuniao == 'CONCLUIDO' || this.reuniao?.statusReuniao == 'CANCELADO') {
      return false
    }
    return true
  }

  openModalDG(demanda: Demanda) {
    this.matDialog.open(ModalDgDocumentosComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: demanda
    }).afterClosed().subscribe({
      next: e => {
        if (e != undefined) {
          let indice: number | undefined = -1
          if (this.listaDemandas) {
            indice = this.listaDemandas.findIndex(p => p.codigoDemanda == e.codigoDemanda);
            if (indice !== -1) {
              this.listaTituloNaoFiltrado = [];
              this.listaDemandas.splice(indice, 1, e);
            }
          }
        }
      },
      error: err => {
        this.showError("Não foi possível adicionar dados!: " + err)
      }
    })
  }

  cancelarReuniao() {
    this.matDialog.open(ModalCancelamentoReuniaoComponent, {
      minWidth: '300px',
      data: this.reuniao?.codigoReuniao
    });
  }

  modalConfirmacaoFinalizar() {
    this.confirmationService.confirm({
      blockScroll: false,
      closeOnEscape: false,
      dismissableMask: true,
      header: 'Finalizar Reunião',
      message: 'Tem certeza que deseja finalizar a reunião? Verifique se colocou todos os devidos pareceres. Caso um parecer não for preenchido, a demanda retorna para seu status anterior',
      accept: () => {
        this.finalizarReuniao()
      },
    });
  }

  openModalDemandaDocumento(event: Demanda) {
    this.matDialog
      .open(ModalDemandaDocumentoComponent, {
        maxWidth: '70vw',
        minWidth: '50vw',
        data: event,
      })
      .afterClosed().subscribe({
        next: e => {
          if (e != undefined) {
            let indice: number | undefined = -1
            if (this.listaDemandas) {
              indice = this.listaDemandas.findIndex(p => p.codigoDemanda == e.codigoDemanda);
              if (indice !== -1) {
                this.listaTituloNaoFiltrado = [];
                this.listaDemandas.splice(indice, 1, e);
              }
            }
          }
        }
      })
  }

  openModalHistorico(codigoDemanda: string) {
    this.matDialog.open(ModalHistoricoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      minHeight: '50vh',
      data: codigoDemanda
    });
  }

  openModalAtaDocumento(tipoAta: string) {
    this.matDialog.open(ModalAtaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: { reuniao: this.reuniao, tipoAta: tipoAta }
    });
  }


  openModalParecerComissaoProposta(proposta: Demanda | undefined) {
    const dialog = this.matDialog.open(ModalParecerComissaoPropostaComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: { demanda: proposta, reuniao: this.reuniao }
    });

    dialog.afterClosed().subscribe({
      next: e => {
        if (e != undefined) {
          let indice: number | undefined = -1
          if (this.reuniao?.propostasReuniao) {
            indice = this.reuniao?.propostasReuniao.findIndex(p => p.codigoDemanda == e.codigoDemanda);
            if (indice !== -1) {
              this.reuniao?.propostasReuniao.splice(indice, 1, e);
            }
          }
        }
      }
    });
  }


}
