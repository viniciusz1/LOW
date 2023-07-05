import { ReuniaoService } from 'src/app/services/reuniao.service';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-cancelamento-reuniao',
  templateUrl: './modal-cancelamento-reuniao.component.html',
  styleUrls: ['./modal-cancelamento-reuniao.component.scss']
})
export class ModalCancelamentoReuniaoComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: number,
    public dialogRef: DialogRef<ModalCancelamentoReuniaoComponent>,
    private messageService: MessageService,
    public reuniaoService: ReuniaoService,
    private route: Router) {
    this.codigoReuniao = data
  }
  motivoInput = ""
  codigoReuniao: number | undefined
  ngOnInit(): void {
  }
  cancelarReuniao() {
    if(this.motivoInput == ""){
      this.showError("Adicione o motivo do cancelamento da reunião!")
    } else {
    this.reuniaoService.cancelarReuniao(this.codigoReuniao, this.motivoInput)
      .subscribe({
        next: e => {
          this.showSuccess("Reunião Cancelada")
          this.dialogRef.close()
          this.route.navigate(['tela-inicial/reunioes']);
        }, error: err => {
          this.showError("Não foi possível cancelar a reunião")
        }
      })
    }
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
