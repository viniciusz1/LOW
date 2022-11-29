import { ModalAtaDocumentoComponent } from './../../../modais/modal-ata-documento/modal-ata-documento.component';
import { ModalParecerComissaoPropostaComponent } from './../../../modais/modal-parecer-comissao-proposta/modal-parecer-comissao-proposta.component';
import { MatDialog } from '@angular/material/dialog';
import { DemandaService } from 'src/app/services/demanda.service';
import { Demanda } from 'src/app/models/demanda.model';

import { Component, OnInit } from '@angular/core';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';

@Component({
  selector: 'app-tela-ver-pauta',
  templateUrl: './tela-ver-pauta.component.html',
  styleUrls: ['./tela-ver-pauta.component.scss']
})
export class TelaVerPauta implements OnInit {

  constructor(private demandaService: DemandaService,
    private matDialog: MatDialog) { }
  listaDemanda:Demanda[] = []
  ngOnInit(): void {
    this.demandaService.getDemandas()
    .subscribe({next: (x) => {
      this.listaDemanda = x
      this.listaDemanda.forEach((demanda) => {
      demanda.statusDemanda = StatusDemanda.TO_DO
      })
    }})
  }

  openModalAtaDocumento() {
    this.matDialog.open(ModalAtaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }


  openModalParecerComissaoProposta() {
    this.matDialog.open(ModalParecerComissaoPropostaComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }

}
