import { Component, OnInit, Input } from '@angular/core';
import { Arquivo } from 'src/app/models/arquivo.model';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
/**
 * Componente criado para facilitar a exibição de informações em uma demanda
 * ou ata
 *
 */
@Component({
  selector: 'app-info-modal-demanda',
  templateUrl: './info-modal-demanda.component.html',
  styleUrls: ['./info-modal-demanda.component.scss']
})
export class InfoModalDemandaComponent implements OnInit {
  @Input() dadosDemanda: Demanda | undefined;
  @Input() custosTotais = 0
  constructor(private demandaService: DemandaService) { }

  ngOnInit(): void {
  }
  download(arquivo?: Arquivo): void {
    if(arquivo){
      this.demandaService.saveByteArray(
        arquivo.dadosArquivo,
        arquivo.tipoArquivo,
        arquivo.nomeArquivo
      );
    }
  }

}
