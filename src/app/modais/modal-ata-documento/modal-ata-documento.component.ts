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
  demandasPorAta: Demanda[] = [];

  constructor(
    @Inject(DIALOG_DATA) public data: { reuniao: Reuniao, tipoAta: string, codigoDemanda?: string },
    private reuniaoService: ReuniaoService
  ) { }

  ngOnInit() {
    this.reuniaoService.getReuniao().subscribe(reunioes => {
      this.reunioes = reunioes;
      if (this.reunioes) {
        for (const reuniaoPrincipal of this.reunioes) {
          if (reuniaoPrincipal.propostasReuniao) {
            for (const demanda of reuniaoPrincipal.propostasReuniao) {
              if (demanda.codigoDemanda === this.data.codigoDemanda) {
                console.log("Entrou no if");
                this.reuniao = reuniaoPrincipal;
                this.demandaEncontrada = true;

                // Exibir informações das propostas
                console.log("Propostas encontradas:");
                for (const proposta of reuniaoPrincipal.propostasReuniao) {
                  console.log(JSON.stringify(proposta.codigoDemanda));
                  this.demandasPorAta.push(proposta);
                }
              }
            }
          }
        }
        if (this.reuniao == null) {
          this.reuniao = this.data.reuniao
          this.tipoAta = this.data.tipoAta
          if (this.reuniao.propostasReuniao) {
            for (const proposta of this.reuniao.propostasReuniao) {
              if (proposta.tipoAtaProposta == this.tipoAta) {
                this.demandasPorAta.push(proposta);
              }
            }
          }
        }
      }
    });
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

  tipoAta: string = "";
}
