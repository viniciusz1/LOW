import { Demanda } from 'src/app/models/demanda.model';
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

    @Inject(DIALOG_DATA) public data: Demanda,
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

  bloquearCamposInput(){
    if(this.data.statusDemanda == "DISCUSSION"){
      return false
    }else{
      this.setInformacoes()
      return true
    }
  }

  
  setInformacoes(){
    if(this.data.parecerComissaoProposta && this.data.tipoAtaProposta && this.data.ultimaDecisaoComissao){
      this.parecerComissaoInput = this.data.parecerComissaoProposta
      if(this.data.recomendacaoProposta){
        this.recomendacaoInput = this.data.recomendacaoProposta
      }
      this.tipoAtaSelecionada = this.data.tipoAtaProposta
      this.resultadoComissaoSelecionado = this.data.ultimaDecisaoComissao
    }
  }

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
    if(this.data.codigoDemanda)
    this.reuniaoService.enviarParecerComissao({ tipoAtaProposta: this.tipoAtaSelecionada,parecerComissaoProposta: this.parecerComissaoInput, decisaoProposta: this.resultadoComissaoSelecionado, recomendacaoProposta: this.recomendacaoInput }, this.data.codigoDemanda?.toString())
      .subscribe({
        next: e => { 
          this.data = e
          this.dialogRef.close()
        },
        error: err => {
          console.log(err)
        }
      })
  }

  ngOnInit(): void {
  }

}
