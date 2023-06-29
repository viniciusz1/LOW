import { path } from './../../services/path/rota-api';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { Reuniao } from 'src/app/models/reuniao.model';
import { ReuniaoService } from 'src/app/services/reuniao.service';

@Component({
  selector: 'app-modal-ata-documento',
  templateUrl: './modal-ata-documento.component.html',
  styleUrls: ['./modal-ata-documento.component.scss']
})
export class ModalAtaDocumentoComponent implements OnInit {
  path = path;
  demandaEncontrada: boolean = false;
  reunioes: Reuniao[] | undefined;
  reuniao: Reuniao | undefined;

  constructor(
    @Inject(DIALOG_DATA) public data: Demanda,
    private reuniaoService: ReuniaoService
  ) {
    this.reuniaoService.getReuniao().subscribe(reunioes => {
      this.reunioes = reunioes;

      if (this.reunioes) {
        for (const reuniaoPrincipal of this.reunioes) {
          if (reuniaoPrincipal.propostasReuniao) {
            for (const demanda of reuniaoPrincipal.propostasReuniao) {
              if (demanda.codigoDemanda === data.codigoDemanda) {
                console.log("Entrou no if");
                this.reuniao = reuniaoPrincipal;
                this.demandaEncontrada = true;

                // Exibir informações das propostas
                console.log("Propostas encontradas:");
                for (const proposta of reuniaoPrincipal.propostasReuniao) {
                  console.log(JSON.stringify(proposta));
                }

                return;
              }
            }
          }
        }
      }
    });

    console.log(this.tipoAta);
  }

  mostrarHr(indice: number, tipoAta: string) {
    console.log("Entrou");
    if (indice === 0) {
      return false;
    }

    if (
      this.reuniao?.propostasReuniao?.filter(
        e => e.tipoAtaProposta === tipoAta
      ).length === 1
    ) {
      return false;
    }

    return true;
  }

  ngOnInit(): void {}
  
  tipoAta: string = "";
}
