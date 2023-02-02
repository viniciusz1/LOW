import { DemandaAnalista } from './../../models/demanda-analista.model';
import { DemandaAnalistaService } from './../../services/demanda-analista.service';
import { Arquivo } from './../../models/arquivo.model';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
@Component({
  selector: 'app-modal-demanda-documento',
  templateUrl: './modal-demanda-documento.component.html',
  styleUrls: ['./modal-demanda-documento.component.scss']
})
export class ModalDemandaDocumentoComponent implements OnInit {
  user = "gerente"
  constructor(
    @Inject(DIALOG_DATA) public data: string,
    private demandaAnalistaService: DemandaAnalistaService,
    private demandaService: DemandaService) {

  }

  dadosDemandaAnalista: DemandaAnalista | undefined;

  enviarDecisao(decisao: number){
    this.demandaService.avancarStatusDemandaComDecisao("1", decisao).subscribe();
  }

  buscarDemandaAnalista(){
    this.demandaAnalistaService.getDemandaAnalistaByCodigoDemanda(this.data).subscribe((demanda) => {
      this.dadosDemandaAnalista = demanda;
      console.log(demanda)
    });
  }

  download(arquivo: Arquivo): void {
    this.demandaService
    .saveByteArray(arquivo.dadosArquivo, arquivo.tipoArquivo, arquivo.nomeArquivo)
  }

  event: any[] = [];
  events1: any[] = [];
  events2: any[] = [];

  ngOnInit() {
    this.buscarDemandaAnalista();
    this.events1 = [
      { status: 'Reserva', date: '15/10/2020 10:30', icon: PrimeIcons.HOURGLASS, color: '#00579D', fontWeight: '600' },
      { status: 'Avaliação', date: '15/10/2020 14:00', icon: PrimeIcons.ELLIPSIS_H, color: '#c9c9c9', fontWeight: '100' },
      { status: 'Negociação', date: '15/10/2020 16:15', icon: PrimeIcons.CHART_BAR, color: '#c9c9c9', fontWeight: '100' },
      { status: 'Execução', date: '16/10/2020 10:00', icon: PrimeIcons.EJECT, color: '#c9c9c9', weigth: '100' },
      { status: 'Projeção', date: '16/10/2020 10:00', icon: PrimeIcons.CHART_PIE, color: '#c9c9c9', weigth: '100' },
      { status: 'Concluído', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#c9c9c9', weigth: '100' }
    ];

    this.events2 = [
      "2020", "2021", "2022", "2023"
    ];
  }





}
