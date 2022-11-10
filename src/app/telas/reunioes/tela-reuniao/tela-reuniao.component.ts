import { Dialog } from '@angular/cdk/dialog';
import { ModalSuaPautaComponent } from 'src/app/modais/modal-sua-pauta/modal-sua-pauta.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-reuniao.component.html',
  styleUrls: ['./tela-reuniao.component.scss']
})
export class TelaReuniaoComponent implements OnInit {
  tipoExibicao = true;
  showFiltro = false;

  openModalSuaPauta(){
    this.dialog.open(ModalSuaPautaComponent, {
      minWidth: '300px',
    });
  }

  constructor(
    public dialog: Dialog,) {
  }

  ngOnInit() {
}}
