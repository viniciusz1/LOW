import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';

@Component({
  selector: 'app-modal-historico',
  templateUrl: './modal-historico.component.html',
  styleUrls: ['./modal-historico.component.scss']
})
export class ModalHistoricoComponent implements OnInit {

  constructor(public dialogRef: DialogRef<ModalHistoricoComponent>,
    @Inject(DIALOG_DATA) public data: string, private demandaService: DemandaService) {
      this.demandaService.getHistoricoDemandaByCodigo(data)
      .subscribe({next: e => {
        console.log(e)
      }, error: err => {
        console.log(err)
      }})
     }
     listaHistoricoDemandas: Demanda[] = []
  ngOnInit(): void {
  }

}
