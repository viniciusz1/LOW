import { CentroCustoService } from './../../../../../services/centro-custo.service';
import { DemandaService } from './../../../../../services/demanda.service';
import { Component, Input, OnInit } from '@angular/core';
import { CentroCusto } from 'src/app/models/centro-custo.model';

@Component({
  selector: 'app-parte-demanda',
  templateUrl: './parte-demanda.component.html',
  styleUrls: ['./parte-demanda.component.scss'],
})
export class ParteDemandaComponent implements OnInit {
  constructor(
    private demandaService: DemandaService,
    private centroCustoService: CentroCustoService,
  ) {}

  centrosCusto: CentroCusto[] = [];
  atualizarCentrosCusto() {
    this.centroCustoService.getCentrosCusto().subscribe({
      next: (centrosCusto) => {(this.centrosCusto = centrosCusto)
      },
      error: (err) => console.log(err),
    });
  }

  mudouMoeda(event: Event, ordemInput: number){
    let moeda = event.target as HTMLSelectElement;
    if(moeda.value == 'Real'){
      if(ordemInput == 1){
        this.localMoedaBeneficio1 = 'pt-BR'
        this.currencyMoedaBeneficio1 = 'BRL'
      }else{
        this.localMoedaBeneficio2 = 'pt-BR'
        this.currencyMoedaBeneficio2 = 'BRL'
      }
    }else if(moeda.value == 'Dollar'){
      if(ordemInput == 1){
        this.localMoedaBeneficio1 = 'en-US'
        this.currencyMoedaBeneficio1 = 'USD'
      }else{
        this.localMoedaBeneficio2 = 'en-US'
        this.currencyMoedaBeneficio2 = 'USD'
      }
    }else if(moeda.value == 'Euro'){
      if(ordemInput == 1){
        this.localMoedaBeneficio1 = 'de-DE'
        this.currencyMoedaBeneficio1 = 'EUR'
      }else{
        this.localMoedaBeneficio2 = 'de-DE'
        this.currencyMoedaBeneficio2 = 'EUR'
      }
    }
  }
  localMoedaBeneficio1='pt-BR'
  localMoedaBeneficio2='pt-BR'
  currencyMoedaBeneficio1 = 'BRL'
  currencyMoedaBeneficio2 = 'BRL'
  demandaForm = this.demandaService.demandaForm;
  selectedCentros: any;
  opcoesDeTamanho = [
     'Muito Pequena' ,
     'Pequena' ,
     'Média' ,
     'Grande' ,
     'Muito Grande'
  ];
  opcoesDeMoeda = [{ name: 'BRL' }, { name: 'EUR' }, { name: 'DOL' }];
  
  ngOnInit(): void {
    this.atualizarCentrosCusto();
  }
  uploadDocumentos(event : any){
    this.demandaService.arquivos = event['files'] as File[];
  }

 
listaCentrodeCusto : number[] = [];
resultado: boolean = true;
  
adicionarCentroCusto(){
    let porcentagemElement: HTMLInputElement = document.getElementById("porcentagemLista") as HTMLInputElement;
    let porcentagem: string = porcentagemElement.value;

    //Lógica para verificar quando fecha em 100%

    let soma: number = this.listaCentrodeCusto.reduce((total, numero) => total + numero, 0);
    let total: number = soma + parseInt(porcentagem);
    
    if(total < 100){
      this.listaCentrodeCusto.push(parseInt(porcentagem));
      this.resultado = true;
    } else if(total == 100){
      this.listaCentrodeCusto.push(parseInt(porcentagem));
      alert("Os Centros de Custo fecharam em 100%")
      this.resultado = false;
    } else if(total > 100){
      alert("Este valor vai passar de 100%, escolha um menor")
      this.resultado = true;
    }

}

}
