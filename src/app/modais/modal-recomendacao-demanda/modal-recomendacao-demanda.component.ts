import { Component, Inject, OnInit } from '@angular/core';
import { Demanda } from 'src/app/models/demanda.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalMotivoDevolucaoComponent } from '../modal-motivo-devolucao/modal-motivo-devolucao.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DemandaService } from 'src/app/services/demanda.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalService } from 'src/app/services/modal.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-recomendacao-demanda',
  templateUrl: './modal-recomendacao-demanda.component.html',
  styleUrls: ['./modal-recomendacao-demanda.component.scss']
})
export class ModalRecomendacaoDemandaComponent implements OnInit {

  dadosDemanda: Demanda | undefined;
  usuario: Usuario | undefined;
  solicitante: boolean = false;
  motivoDemandaPropria = "Os motivos não foram disponibilizados";

  constructor(public dialogRef: DialogRef<ModalMotivoDevolucaoComponent>,
    private demandaService: DemandaService,
    private usuarioService: UsuarioService,
    @Inject(DIALOG_DATA) public data: Demanda,
    private modalService: ModalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router
  ) {
    this.usuario = usuarioService.getUser('user')
    console.log(data)
    this.dadosDemanda = data
    if (this.dadosDemanda.solicitanteDemanda?.codigoUsuario == this.usuario?.codigoUsuario) {
      this.solicitante = true;
    } else {
      this.solicitante = false;
    }
  }

  ngOnInit(): void {
  }

  motivoRecomendacao = ""

  aprovarDemanda() {
    // console.log(this.dadosDemanda)
    if (this.dadosDemanda?.codigoDemanda) {
      console.log(this.motivoRecomendacao)
      //Parâmetro 0 na decisão significa que a demand é reprovada
      if (this.motivoRecomendacao == "") {
        this.showError("O campo de recomendação deve ser preenchido!")
      } else {
        this.enviarDecisao(1)
      }
    }
  }

  enviarDecisao(decisao: number) {
    if (this.dadosDemanda?.codigoDemanda || this.dadosDemanda?.codigoDemanda == '0') {
      this.demandaService
        .avancarStatusDemandaComDecisao(
          this.dadosDemanda.codigoDemanda,
          decisao
        )
        .subscribe({
          next: event => {
            this.showSuccess("Decisão enviada!")
            this.dialogRef.close(event)
            if (this.modalService.dialogRefDemandaDocumento) {
              this.modalService.dialogRefDemandaDocumento.close();
            }
            this.modalService.modalFechado.emit();
            this.route.navigate(['tela-inicial']);
          },
          error: err => {
            this.showError("Decisão não enviada!")
          }
        });
    }
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
