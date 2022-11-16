import { ModalMotivoDevolucaoComponent } from './../modal-motivo-devolucao/modal-motivo-devolucao.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-reprovacao-demanda',
  templateUrl: './modal-reprovacao-demanda.component.html',
  styleUrls: ['./modal-reprovacao-demanda.component.scss']
})
export class ModalReprovacaoDemandaComponent implements OnInit {

  constructor(public dialogRef: DialogRef<ModalMotivoDevolucaoComponent>) { }

  ngOnInit(): void {
  }

}
