import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


interface CentrosCusto {
  centro: string;
}


@Component({
  selector: 'app-parte-demanda',
  templateUrl: './parte-demanda.component.html',
  styleUrls: ['./parte-demanda.component.scss']
})
export class ParteDemandaComponent implements OnInit {

  constructor(
    private fb: FormBuilder) { }
  demandaForm = this.fb.group({
    tituloDemanda: [''],
    situacaoAtualDemanda: [''],
    objetivoDemanda: [''],
    centroCustoDemanda: [''],
    beneficioRealDemanda: this.fb.group({
      moeda: [''],
      memoriaCalculo: [''],
      valor: [''],
    }),
    beneficioPotencialDemanda: this.fb.group({
      moeda: [''],
      memoriaCalculo: [''],
      valor: [''],
    }),
    beneficioQualitativoDemanda: [''],
    frequenciaDeUsoDemanda: [''],

    solicitanteDemanda: ['Por localStorage']
  });
  
  selectedCentros: any;
  centrosCusto: CentrosCusto[] = [
    { centro: 'Weg 1' },
    { centro: 'Weg 2' },
    { centro: 'Weg 3' },
  ];
  opcoesDeTamanho = [
    { name: 'Muito Pequena' },
    { name: 'Pequena' },
    { name: 'Média' },
    { name: 'Grande' },
    { name: 'Muito Grande' },
  ];
  opcoesDeMoeda = [
    { name: 'BRL' },
    { name: 'EUR' },
    { name: 'DOL' },
  ];
  onSubmitDemanda() {
    //ARQUIVO -- NÃO FUNCIONA
    // this.demandaForm.patchValue({
    //   anexoDemanda: JSON.stringify(this.arquivos),
    // });
    // this.demandaService.postDemanda(this.demandaForm.value).subscribe({
    //     next: (response) => {
    //       console.log(response)
    //     },
    //     error: (err) => {
    //       console.error(err)
    //     }
    //   })
    // console.log(this.demandaForm.value)
  }
  ngOnInit(): void {
  }

}
