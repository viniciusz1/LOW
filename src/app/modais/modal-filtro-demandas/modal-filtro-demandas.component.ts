import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-filtro-demandas',
  templateUrl: './modal-filtro-demandas.component.html',
  styleUrls: ['./modal-filtro-demandas.component.scss']
})
export class ModalFiltroDemandasComponent implements OnInit {
  tamanhos: any[] = [];
  value8: any;

  constructor(public dialogRef: DialogRef<ModalFiltroDemandasComponent>) {
    this.tamanhos = [
      {tam: "Muito Pequeno"},
      {tam: "Pequeno"},
      {tam: "Médio"},
      {tam: "Grande"},
      {tam: "Muito Grande"},
    ]
   }

  ngOnInit(): void {
  }

}
