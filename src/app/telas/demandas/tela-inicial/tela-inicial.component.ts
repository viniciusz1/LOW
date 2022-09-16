import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss']
})
export class TelaInicialComponent implements OnInit {

  constructor() { }
  position_list_cards = 0
  tipo_exibicao_demanda = true

  showSidebar = -0;
  moveSidebar(){
    if(this.showSidebar == 0){
      this.showSidebar = -25
    }else{
      this.showSidebar = 0
    }
  }
  change_right(){
    this.position_list_cards -= 700
  }
  change_to_list(){
    this.tipo_exibicao_demanda = false
  }
  change_to_card(){
    this.tipo_exibicao_demanda = true
  }
  change_left() {
    this.position_list_cards += 700
  }
  ngOnInit(): void {
  }

}
