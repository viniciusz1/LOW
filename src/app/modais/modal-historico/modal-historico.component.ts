import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-historico',
  templateUrl: './modal-historico.component.html',
  styleUrls: ['./modal-historico.component.scss']
})
export class ModalHistoricoComponent implements OnInit {

  constructor(public dialogRef: DialogRef<ModalHistoricoComponent>) { }

  ngOnInit(): void {
  }

}
