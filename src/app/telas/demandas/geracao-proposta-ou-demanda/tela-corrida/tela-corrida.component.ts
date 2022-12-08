import { DemandaService } from 'src/app/services/demanda.service';
import { Router } from '@angular/router';
import { Recurso } from './../../../../models/recurso.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { MessageService, SelectItem } from 'primeng/api';
import { TipoDespesa } from 'src/app/models/tipoDespesa.enum';
import { ScrollSpyService } from 'ng-spy';



interface CentrosCusto {
  centro: string;
}

interface Moedas {
  abreviacao: string;
}

@Component({
  selector: 'app-tela-corrida',
  templateUrl: './tela-corrida.component.html',
  styleUrls: ['./tela-corrida.component.scss'],
})
export class TelaCorridaComponent implements OnInit {
  

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
  arquivos: File[] = [];
  arquivosUpload(event: any) {
    console.log(event);
    this.arquivos = event.currentFiles;
  }

  constructor(
    private spyService: ScrollSpyService,
    private router: Router,
    private fb: FormBuilder,
    private demandaService: DemandaService
  ) {
    this.tipoExibicaoTela();
  }

  
  activeTarget: string = '';
  aparecerProposta = false;
  uploadedFiles: any[] = [];
  selectedCentros: any;
  opcoesDeTamanho = [
    { name: 'Muito Pequena' },
    { name: 'Pequena' },
    { name: 'Média' },
    { name: 'Grande' },
    { name: 'Muito Grande' },
  ];
  
  statuses: SelectItem[] = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
  ];
  
  moedas: Moedas[] = [
    { abreviacao: 'BRL' },
    { abreviacao: 'EUR' },
    { abreviacao: 'USD' },
  ];
  centrosCusto: CentrosCusto[] = [
    { centro: 'Weg 1' },
    { centro: 'Weg 2' },
    { centro: 'Weg 3' },
  ];
  
 

  setActiveTarget(targetName: string) {
    this.activeTarget = targetName;
  }

  

  tipoExibicaoTela() {
    if (this.router.url == '/tela-inicial/demanda') {
      this.aparecerProposta = false;
    } else {
      this.aparecerProposta = true;
    }
  }
  ngOnInit(): void {}

  
}
