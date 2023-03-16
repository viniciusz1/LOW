import { ModalMotivoDevolucaoComponent } from './../modal-motivo-devolucao/modal-motivo-devolucao.component';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';

@Component({
  selector: 'app-modal-reprovacao-demanda',
  templateUrl: './modal-reprovacao-demanda.component.html',
  styleUrls: ['./modal-reprovacao-demanda.component.scss']
})
export class ModalReprovacaoDemandaComponent implements OnInit {
  dadosDemanda: Demanda | undefined;

  constructor(public dialogRef: DialogRef<ModalMotivoDevolucaoComponent>,
    private demandaService: DemandaService,
    @Inject(DIALOG_DATA) public data: Demanda,
  ) {
    this.dadosDemanda = data
  }

  ngOnInit(): void {
  }

  // enviarDecisao(decisao: number) {
  //   if (this.dadosDemanda?.codigoDemanda || this.dadosDemanda?.codigoDemanda == '0') {
  //     console.log("ENTROU");
  //     this.demandaService
  //       .avancarStatusDemandaComDecisao(
  //         this.dadosDemanda.codigoDemanda,
  //         decisao
  //       )
  //       .subscribe({
  //         next: event => {
  //           console.log(event)
  //           this.dialogRef.close()
  //         },
  //         error: err => {
  //           console.log(err)
  //         }
  //       });
  //   }
  // }

}
