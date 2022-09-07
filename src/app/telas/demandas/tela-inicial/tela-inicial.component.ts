import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {

  constructor() { }
  position_list_cards = 0

  changeRight(){
    this.position_list_cards -= 700
  }

  changeLeft() {
    this.position_list_cards += 700
  }
  ngOnInit(): void {
  }

}
