import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-sua-pauta',
  templateUrl: './modal-sua-pauta.component.html',
  styleUrls: ['./modal-sua-pauta.component.scss']
})
export class ModalSuaPautaComponent implements OnInit {

  constructor(public dialogRef: DialogRef<ModalSuaPautaComponent>) { }

  ngOnInit(): void {
  }

}
