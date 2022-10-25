import { Dialog } from '@angular/cdk/dialog';
import { ModalSuaPautaComponent } from 'src/app/modais/modal-sua-pauta/modal-sua-pauta.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-dataComissao.component.html',
  styleUrls: ['./tela-dataComissao.component.scss']
})
export class TelaDataComissaoComponent implements OnInit {

  constructor(
    public dialog: Dialog,
  ) { }
  openModalSuaPauta(){
    this.dialog.open(ModalSuaPautaComponent, {
      minWidth: '300px',
    });
  }
  ngOnInit(): void {
  }

}
