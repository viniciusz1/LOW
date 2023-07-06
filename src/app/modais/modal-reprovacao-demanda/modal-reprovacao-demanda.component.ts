import { Router } from '@angular/router';
import { ModalMotivoDevolucaoComponent } from './../modal-motivo-devolucao/modal-motivo-devolucao.component';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-reprovacao-demanda',
  templateUrl: './modal-reprovacao-demanda.component.html',
  styleUrls: ['./modal-reprovacao-demanda.component.scss']
})
export class ModalReprovacaoDemandaComponent implements OnInit {
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
    if(this.dadosDemanda.solicitanteDemanda?.codigoUsuario == this.usuario?.codigoUsuario){
      this.solicitante = true;
    } else {
      this.solicitante = false;
    }
  }

  ngOnInit(): void {
  }
  
  motivoReprovacao = ""

  cancelarDemanda(){
    this.confirmationService.confirm({
      dismissableMask: true,
      header: 'Cancelar Demanda',
      blockScroll: false,
      message: 'Tem certeza que deseja cancelar esta demanda?',
      accept: () => {
        if (this.data.codigoDemanda) {
          this.demandaService
            .reprovarDemanda(
              parseInt(this.data.codigoDemanda),
              this.motivoDemandaPropria
            )
            .subscribe({
              next: event => {
                this.showSuccess("Demanda reprovada com sucesso!")
              },
              error: err => {
                this.showError("Não foi possivel cancelar a demanda!")
              }
            });
        }
      },
      },
    );
  }

  reprovarDemanda() {
    // console.log(this.dadosDemanda)
    if(this.dadosDemanda?.codigoDemanda){
      console.log(this.motivoReprovacao)
    //Parâmetro 0 na decisão significa que a demand é reprovada
    if(this.motivoReprovacao == ""){
      this.showError("O campo motivo reprovação, deve ser preenchido!")
    }else{
    this.demandaService
      .reprovarDemanda(
        parseInt(this.dadosDemanda.codigoDemanda),
        this.motivoReprovacao
      )
      .subscribe({
        next: event => {
          this.showSuccess("Demanda reprovada com sucesso!")
          this.dialogRef.close()
          if (this.modalService.dialogRefDemandaDocumento) {
            this.modalService.dialogRefDemandaDocumento.close();
          }
          this.modalService.modalFechado.emit(); 
          this.route.navigate(['tela-inicial']);
        },
        error: err => {
          this.showError("Não foi possivel reprovar a demanda!")
        }
      });
    }
  }
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
