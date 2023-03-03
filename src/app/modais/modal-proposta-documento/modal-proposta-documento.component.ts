import { Component, OnInit } from '@angular/core';
import { Proposta } from 'src/app/models/proposta.model';

@Component({
  selector: 'app-modal-proposta-documento',
  templateUrl: './modal-proposta-documento.component.html',
  styleUrls: ['./modal-proposta-documento.component.scss']
})
export class ModalPropostaDocumentoComponent implements OnInit {

  constructor() { }
  proposta: Proposta | undefined

  ngOnInit(): void {
  }

}
