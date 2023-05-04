import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Reuniao } from 'src/app/models/reuniao.model';

@Component({
  selector: 'app-modal-ata-documento',
  templateUrl: './modal-ata-documento.component.html',
  styleUrls: ['./modal-ata-documento.component.scss']
})
export class ModalAtaDocumentoComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: { reuniao: Reuniao, tipoAta: string },) {
      console.log(data)
    this.reuniao = data.reuniao;
    this.tipoAta = data.tipoAta;
  }


  ngOnInit(): void {
  }

  tipoAta: string = ""
  reuniao: Reuniao | undefined

}
