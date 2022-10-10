import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-motivo-devolucao',
  templateUrl: './modal-motivo-devolucao.component.html',
  styleUrls: ['./modal-motivo-devolucao.component.scss']
})
export class ModalMotivoDevolucaoComponent implements OnInit {

  constructor(public dialogRef: DialogRef<ModalMotivoDevolucaoComponent>) { }
  ngOnInit(): void {
  }

}
