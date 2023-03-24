import { ModalPropostaDocumentoComponent } from './../modal-proposta-documento/modal-proposta-documento.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ReuniaoService } from 'src/app/services/reuniao.service';

@Component({
  selector: 'app-modal-parecer-comissao-proposta',
  templateUrl: './modal-parecer-comissao-proposta.component.html',
  styleUrls: ['./modal-parecer-comissao-proposta.component.scss']
})
export class ModalParecerComissaoPropostaComponent implements OnInit {

  constructor(

    @Inject(DIALOG_DATA) public data: string,
    public dialogRef: DialogRef<ModalParecerComissaoPropostaComponent>,
    private matDialog: MatDialog,
    private reuniaoService: ReuniaoService

  ) { }
  tipoAtaSelecionada: string = "";
  tipoAtas = [
    { name: 'Ata Publicada', value: 'PUBLICADA' },
    { name: 'Ata não Publicada', value: 'NAO_PUBLICADA' },
  ]
  aparecerRecomendacao: boolean = false;
  resultadoComissaoSelecionado: string = "";
  resultadoComissao = [
    { name: 'Aprovar', value: 'APROVAR' },
    { name: 'Aprovar com Recomendação', value: 'APROVAR_COM_RECOMENDACAO' },
    { name: 'Reapresentar com Recomendação', value: 'REAPRESENTAR_COM_RECOMENDACAO' },
    { name: 'Reprovar', value: 'REPROVAR' },
  ]
  parecerComissaoInput = ""
  recomendacaoInput = ""
  selecionaResultado() {
    
    if (this.resultadoComissaoSelecionado == "APROVAR_COM_RECOMENDACAO" || this.resultadoComissaoSelecionado == "REAPRESENTAR_COM_RECOMENDACAO") {
      this.aparecerRecomendacao = true;
    } else {
      this.aparecerRecomendacao = false;
    }
  }

  openModalPropostaDocumento() {
    this.matDialog.open(ModalPropostaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
    });
  }

  enviarParecerComissao() {
    this.reuniaoService.enviarParecerComissao({ tipoAtaProposta: this.tipoAtaSelecionada,parecerComissaoProposta: this.parecerComissaoInput, decisaoProposta: this.resultadoComissaoSelecionado, recomendacaoProposta: this.recomendacaoInput }, this.data)
      .subscribe({
        next: e => { console.log(e) },
        error: err => {
          console.log(err)
        }
      })
  }

  ngOnInit(): void {
  }

}
