import { ModalMotivoDevolucaoComponent } from './../modal-motivo-devolucao/modal-motivo-devolucao.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';

@Component({
  selector: 'app-modal-reprovacao-demanda',
  templateUrl: './modal-reprovacao-demanda.component.html',
  styleUrls: ['./modal-reprovacao-demanda.component.scss']
})
export class ModalReprovacaoDemandaComponent implements OnInit {

  constructor(public dialogRef: DialogRef<ModalMotivoDevolucaoComponent>,
    private demandaService: DemandaService) { }

  ngOnInit(): void {
  }

  // mudarStatusReprovacao(){
  //   this.demandaService.avancarStatusDemandaComDecisao('37', 2).subscribe((e) => {
  //     console.log(e); 
  //   });
  // }
  
}
