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
import { SpyTarget } from 'ng-spy/lib/spy-target.model';



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
  aparecerProposta = false


  constructor(
    private spyService: ScrollSpyService,
    private router: Router,
    private fb: FormBuilder,
    private demandaService: DemandaService
  ) {
    this.tipoExibicaoTela();
  }



  tipoExibicaoTela() {
    if (this.router.url == '/tela-inicial/demanda') {
      this.aparecerProposta = false;
    } else {
      this.aparecerProposta = true;
    }
  }
  ngOnInit(): void {
    this.spyService.spy()
    this.spyService.activeSpyTarget.subscribe(e => console.log(e))
  }


}
