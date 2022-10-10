import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-filtro-demandas',
  templateUrl: './modal-filtro-demandas.component.html',
  styleUrls: ['./modal-filtro-demandas.component.scss']
})
export class ModalFiltroDemandasComponent implements OnInit {

  constructor(public dialogRef: DialogRef<ModalFiltroDemandasComponent>) { }

  ngOnInit(): void {
  }

}
