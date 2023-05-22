import { StatusReuniao } from 'src/app/models/statusReuniao.enum';
import { Demanda } from 'src/app/models/demanda.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ReuniaoService } from 'src/app/services/reuniao.service';
import { MessageService } from 'primeng/api';
import { Reuniao } from 'src/app/models/reuniao.model';
import { ModalDemandaDocumentoComponent } from '../modal-demanda-documento/modal-demanda-documento.component';

@Component({
  selector: 'app-modal-parecer-comissao-proposta',
  templateUrl: './modal-parecer-comissao-proposta.component.html',
  styleUrls: ['./modal-parecer-comissao-proposta.component.scss']
})
export class ModalParecerComissaoPropostaComponent implements OnInit {

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: { demanda: Demanda, reuniao: Reuniao },
    public dialogRef: MatDialogRef<ModalParecerComissaoPropostaComponent>,
    private matDialog: MatDialog,
    private reuniaoService: ReuniaoService,
    private messageService: MessageService

  ) {

    this.demanda = this.data.demanda
    this.setInformacoes()

  }
  demanda: Demanda | undefined
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

  bloquearCamposInput() {
    if (this.data.reuniao.statusReuniao == "CONCLUIDO" ||
      this.data.reuniao.statusReuniao == "CANCELADO") {
      return true
    }
    return false
  }

  textoBotaoParecer = "Finalizar Parecer"

  setInformacoes() {
    if (this.demanda?.parecerComissaoProposta && this.demanda?.tipoAtaProposta && (this.demanda?.ultimaDecisaoComissao)) {
      this.textoBotaoParecer = "Editar Parecer"
      this.parecerComissaoInput = this.demanda?.parecerComissaoProposta
      if (this.demanda?.recomendacaoProposta) {
        this.recomendacaoInput = this.demanda?.recomendacaoProposta
        this.aparecerRecomendacao = true
      }
      this.tipoAtaSelecionada = this.demanda?.tipoAtaProposta
      this.resultadoComissaoSelecionado = this.demanda?.ultimaDecisaoComissao
    }
  }

  selecionaResultado() {
    if (this.resultadoComissaoSelecionado == "APROVAR_COM_RECOMENDACAO" || this.resultadoComissaoSelecionado == "REAPRESENTAR_COM_RECOMENDACAO") {
      this.aparecerRecomendacao = true;
    } else {
      this.aparecerRecomendacao = false;
    }
  }

  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: this.demanda
    });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  enviarParecerComissao() {
    if (this.demanda?.codigoDemanda)
      this.reuniaoService.enviarParecerComissao(this.data.reuniao.codigoReuniao, {tipoAtaProposta: this.tipoAtaSelecionada, parecerComissaoProposta: this.parecerComissaoInput, decisaoProposta: this.resultadoComissaoSelecionado, recomendacaoProposta: this.recomendacaoInput }, this.demanda.codigoDemanda?.toString())
        .subscribe({
          next: e => {
            this.showSuccess("Parecer enviado!")
            this.dialogRef.close(e)
          },
          error: err => {
            this.showError("Não foi possível enviar o Parecer da Comissão")
          }
        })
  }

  ngOnInit(): void {
  }

}
