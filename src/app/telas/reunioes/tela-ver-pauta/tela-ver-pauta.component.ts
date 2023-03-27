import { ModalAtaDocumentoComponent } from './../../../modais/modal-ata-documento/modal-ata-documento.component';
import { ModalParecerComissaoPropostaComponent } from './../../../modais/modal-parecer-comissao-proposta/modal-parecer-comissao-proposta.component';
import { MatDialog } from '@angular/material/dialog';
import { DemandaService } from 'src/app/services/demanda.service';
import { Demanda } from 'src/app/models/demanda.model';

import { Component, OnInit } from '@angular/core';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { ActivatedRoute } from '@angular/router';
import { ReuniaoService } from 'src/app/services/reuniao.service';
import { Reuniao } from 'src/app/models/reuniao.model';
import { Proposta } from 'src/app/models/proposta.model';

@Component({
  selector: 'app-tela-ver-pauta',
  templateUrl: './tela-ver-pauta.component.html',
  styleUrls: ['./tela-ver-pauta.component.scss']
})
export class TelaVerPauta implements OnInit {

  constructor(private demandaService: DemandaService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private reuniaoService: ReuniaoService) { }

  codigoReuniao = this.activatedRoute.snapshot.params['codigoReuniao']
  reuniao: Reuniao | undefined = undefined;

  ngOnInit(): void {
    this.reuniaoService.getReuniaoId(this.codigoReuniao)
    .subscribe({next: (x) => {
      console.log(x)
      this.reuniao = x
      // this.listaProposta.forEach((demanda) => {
      // demanda.statusDemanda = StatusDemanda.TO_DO
      // })
    }})


  }

  openModalAtaDocumento(tipoAta: string) {
    this.matDialog.open(ModalAtaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: {reuniao: this.reuniao, tipoAta: tipoAta}
    });
  }


  openModalParecerComissaoProposta(codigoDemanda: string | undefined) {
    this.matDialog.open(ModalParecerComissaoPropostaComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: codigoDemanda
    });
  }

}
