import { Router } from '@angular/router';
import { ModalMotivoDevolucaoComponent } from './../modal-motivo-devolucao/modal-motivo-devolucao.component';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modal-reprovacao-demanda',
  templateUrl: './modal-reprovacao-demanda.component.html',
  styleUrls: ['./modal-reprovacao-demanda.component.scss']
})
export class ModalReprovacaoDemandaComponent implements OnInit {
  dadosDemanda: Demanda | undefined;
  usuario: Usuario | undefined;
  solicitante: boolean = false;

  constructor(public dialogRef: DialogRef<ModalMotivoDevolucaoComponent>,
    private demandaService: DemandaService,
    private usuarioService: UsuarioService,
    @Inject(DIALOG_DATA) public data: Demanda,
    private router: Router,
    private messageService: MessageService
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
  reprovarDemanda() {
    // console.log(this.dadosDemanda)
    if(this.dadosDemanda?.codigoDemanda)
    //Parâmetro 0 na decisão significa que a demand é reprovada
    this.demandaService
      .reprovarDemanda(
        parseInt(this.dadosDemanda.codigoDemanda),
        this.motivoReprovacao
      )
      .subscribe({
        next: event => {
          this.showSuccess("Demanda reprovada com sucesso!")
          this.router.navigate(['/tela-inicial'])
          this.dialogRef.close()
        },
        error: err => {
          this.showError("Não foi possivel reprovar a demanda!")
        }
      });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
