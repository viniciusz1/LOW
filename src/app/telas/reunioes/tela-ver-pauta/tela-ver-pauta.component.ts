import { DemandaService } from 'src/app/services/demanda.service';
import { Demanda } from 'src/app/models/demanda.model';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-ver-pauta',
  templateUrl: './tela-ver-pauta.component.html',
  styleUrls: ['./tela-ver-pauta.component.scss']
})
export class TelaVerPauta implements OnInit {

  constructor(private demandaService: DemandaService) { }
  listaDemanda:Demanda[] = []
  ngOnInit(): void {
    this.demandaService.getDemandas()
    .subscribe({next: (x) => {
      this.listaDemanda = x
    }})
  }

}
