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
    private router: Router) { }

  codigoReuniao = this.activatedRoute.snapshot.params['codigoReuniao']
  reuniao: Reuniao | undefined = undefined;

  ngOnInit(): void {
    this.reuniaoService.getReuniaoId(this.codigoReuniao)
      .subscribe({
        next: (x) => {
          this.reuniao = x
        }
      })
  }

  finalizarReuniao() {
    this.reuniaoService.finalizarReuniao(this.reuniao?.codigoReuniao)
      .subscribe({
        next: e => {
          this.router.navigate(['/tela-inicial/reunioes'])
        }, error: err => {
          alert(err)
        }
      })
  }

  mostrarBotoesReuniao() {
    if (this.reuniao?.statusReuniao == 'CONCLUIDO' || this.reuniao?.statusReuniao == 'CANCELADO') {
      return false
    }
    return true
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
      data: { demanda: proposta, statusReuniao: this.reuniao?.statusReuniao }
    });
    
    dialog.afterClosed().subscribe({next: e => {let indice: number | undefined = -1
      if (this.reuniao?.propostasReuniao) {
        indice = this.reuniao?.propostasReuniao.findIndex(p => p.codigoDemanda == e.codigoDemanda);
        if (indice !== -1) {
          this.reuniao?.propostasReuniao.splice(indice, 1, e);
        }
      }
    }});
  }

}
