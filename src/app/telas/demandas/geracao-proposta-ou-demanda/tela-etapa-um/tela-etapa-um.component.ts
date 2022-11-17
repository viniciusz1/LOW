import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-etapa-um',
  templateUrl: './tela-etapa-um.component.html',
  styleUrls: ['./tela-etapa-um.component.scss']
})
export class TelaEtapaUmComponent implements OnInit {

  disabled: boolean = true;

  value1: string = "";

  value2: string = "";

  value3: string = "";

  value4: string = "";

  value5: string = 'Disabled';

  aparecer = 1;

  constructor() { }

  ngOnInit(): void {
  }

  chamarAnalista(tipo: number){ 
    if(tipo >= 0 && tipo <= 1){
      this.aparecer == tipo;
    } else {
      console.log("Tipo incompativel")
    }
  }

}
