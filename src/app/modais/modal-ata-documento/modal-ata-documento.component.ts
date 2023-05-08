import { path } from './../../services/path/rota-api';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Reuniao } from 'src/app/models/reuniao.model';

@Component({
  selector: 'app-modal-ata-documento',
  templateUrl: './modal-ata-documento.component.html',
  styleUrls: ['./modal-ata-documento.component.scss']
})
export class ModalAtaDocumentoComponent implements OnInit {
  path = path;
  constructor(
    @Inject(DIALOG_DATA) public data: { reuniao: Reuniao, tipoAta: string },) {
    this.reuniao = data.reuniao;
    this.tipoAta = data.tipoAta;
    console.log(this.tipoAta)
  }


  ngOnInit(): void {
  }

  tipoAta: string = ""
  reuniao: Reuniao | undefined

}
