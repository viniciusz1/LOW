import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-parecer-comissao-proposta',
  templateUrl: './modal-parecer-comissao-proposta.component.html',
  styleUrls: ['./modal-parecer-comissao-proposta.component.scss']
})
export class ModalParecerComissaoPropostaComponent implements OnInit {

  constructor(public dialogRef: DialogRef<ModalParecerComissaoPropostaComponent>) { }

  ngOnInit(): void {
  }

}
