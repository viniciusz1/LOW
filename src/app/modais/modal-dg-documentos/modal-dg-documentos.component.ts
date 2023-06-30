import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { Demanda } from 'src/app/models/demanda.model';
import { Reuniao } from 'src/app/models/reuniao.model';
import { ReuniaoService } from 'src/app/services/reuniao.service';
import { ModalDemandaDocumentoComponent } from '../modal-demanda-documento/modal-demanda-documento.component';

@Component({
  selector: 'app-modal-dg-documentos',
  templateUrl: './modal-dg-documentos.component.html',
  styleUrls: ['./modal-dg-documentos.component.scss']
})
export class ModalDgDocumentosComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDgDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Demanda,
    private reuniaoService: ReuniaoService,
    private messageService: MessageService,
    private matDialog: MatDialog

  ) {

    this.demanda = this.data
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

  enviarParecerDG() {
    if (this.demanda?.codigoDemanda)
      this.reuniaoService.enviarParecerDG();
  }






  ngOnInit(): void {
  }
  numAtaDG: string = ''
  onUpload(event: any) {
    this.listaFiles = []
    this.listaFiles.push(event['files'][0] as File)
  }
  listaFiles: File[] = []
}
