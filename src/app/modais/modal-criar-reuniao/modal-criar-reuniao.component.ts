import { Reuniao } from './../../models/reuniao.model';
import { Demanda } from './../../models/demanda.model';
import { UsuarioService } from './../../services/usuario.service';
import { Router } from '@angular/router';
import { DemandaService } from 'src/app/services/demanda.service';
import { StatusDemanda } from 'src/app/models/statusDemanda.enum';
import { Component, OnInit, Inject,LOCALE_ID } from '@angular/core';
import { Proposta } from 'src/app/models/proposta.model';
import { ReuniaoService } from 'src/app/services/reuniao.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalHistoricoComponent } from '../modal-historico/modal-historico.component';
import { ModalDemandaDocumentoComponent } from '../modal-demanda-documento/modal-demanda-documento.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StatusReuniao } from 'src/app/models/statusReuniao.enum';
import { Calendar } from 'primeng/calendar';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);


@Component({
  selector: 'app-modal-criar-reuniao',
  templateUrl: './modal-criar-reuniao.component.html',
  styleUrls: ['./modal-criar-reuniao.component.scss'],
  providers: [
    Calendar,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class ModalCriarReuniaoComponent implements OnInit {
  localeConfig: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Demanda | Reuniao,
    public dialogRef: MatDialogRef<ModalCriarReuniaoComponent>,
    private matDialog: MatDialog,
    private demandaService: DemandaService,
    private reuniaoService: ReuniaoService,
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private calendar: Calendar
  ) {
    this.dataReuniao = new Date();
    this.localeConfig = this.calendar.locale;
    this.usuarioService.verificarTokenUserDetailsReturn()
      .subscribe(
        {
          next: e => {
            // FAZER VERIFICAÇÃO DE QUEM PODE USAR+
          },
          error: err => {
            this.showError("Não foi possível verificar o Token")
          }
        }
      )
  }


  fecharModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.atualizarDemandas();
  }

  listaComissoes = [
    { value: "CPVM", nome: "CPVM – Comissão de Processos de Vendas e Desenvolvimento de produtos" },
    { value: "CPGCI", nome: "CPGCI – Comissão de Processos da Cadeia Integrada" },
    { value: "CPGPR", nome: "CPGPR – Comissão de Processos de Gestão de Projetos" },
    { value: "CGPN", nome: "CGPN – Comitê de Gestão de Processos de Negócio" },
    { value: "CTI", nome: "CTI – Comitê de TI" },
    { value: "CWBS", nome: "CWBS – Comitê WEG Business Services" },
    { value: "DTI", nome: "DTI – Diretoria de TI" },
  ]

  openModalHistorico(codigoDemanda: string) {
    this.matDialog.open(ModalHistoricoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      minHeight: '30vh',
      data: codigoDemanda
    });
  }

  openModalDemandaDocumento(event: Demanda) {
    this.matDialog
      .open(ModalDemandaDocumentoComponent, {
        maxWidth: '70vw',
        minWidth: '50vw',
        data: event,
      })
      .afterClosed().subscribe({
        next: e => {
          let indice: number | undefined = -1
          if (this.listaDemandas) {
            indice = this.listaDemandas.findIndex(p => p.codigoDemanda == e.codigoDemanda);
            if (indice !== -1) {
              this.listaDemandas.splice(indice, 1, e);
            }
          }
        }
      })
  }

  // irParaChat() {
  //   this.dialogRef.close();
  //   this.router.navigate(['/tela-inicial/chat']);
  // }

  listaReunioes: Reuniao[] = [];
  listaDemandasEscolhidas: Demanda[] = [];
  draggedDemanda: Demanda | undefined = undefined;
  listaDemandas: Demanda[] = [];
  listaProposta: Proposta[] = [];
  cabecalhoMensagemDeConfirmacao = 'Avançar status';

  dataReuniao: Date;
  comissaoSelecionada: string | undefined = undefined;

  onSubmit() {
    let reuniao: Reuniao = {
      dataReuniao: this.dataReuniao,
      comissaoReuniao: this.comissaoSelecionada,
      propostasReuniao: this.listaDemandasEscolhidas,
      statusReuniao: StatusReuniao.PROXIMO,
      codigoReuniao: parseInt(this.router.url.split("/").pop() as string)
    }
    if (!Array.isArray(this.data)) {
      this.reuniaoService.postReuniao(reuniao)
        .subscribe({
          next: reuniao => {
            this.showSuccess("Reunião Marcada!")
            this.router.navigate(['/tela-inicial/reunioes'])
            this.dialogRef.close(reuniao)
          }, error: err => {
            this.showError("Não foi possível marcar a reunião")
          }
        })
    } else {
      this.reuniaoService.putReuniao(reuniao)
        .subscribe({
          next: reuniao => {
            this.showSuccess("Reunião Editada com sucesso!")
            this.router.navigate(['/tela-inicial/reunioes'])
            this.dialogRef.close()
          }, error: err => {
            this.showError("Não foi possível editar a reunião")
          }
        })
    }
  }
  dragStart(demanda: Demanda) {
    this.draggedDemanda = demanda;
  }

  excluirDemanda(demanda: Demanda) {
    this.listaDemandasEscolhidas.splice(
      this.listaDemandasEscolhidas.indexOf(demanda),
      1
    );
    this.listaDemandas.push(demanda);
  }

  adicionarDemanda(demanda: Demanda) {
    this.listaDemandasEscolhidas.push(demanda);
    this.listaDemandas.splice(this.listaDemandas.indexOf(demanda), 1);
  }

  drop() {
    if (this.draggedDemanda) {
      let draggedProductIndex = this.findIndex(this.draggedDemanda);
      this.listaDemandasEscolhidas = [
        ...this.listaDemandasEscolhidas,
        this.draggedDemanda,
      ];
      this.listaDemandas = this.listaDemandas.filter(
        (val, i) => i != draggedProductIndex
      );
      this.draggedDemanda = undefined;
    }
  }

  instanceOfDemanda(data: any): data is Demanda {
    return 'codigoDemanda' in data;
  }

  removerDaListaAdicSecundaria() {

    if (this.data == undefined) {
      return
    }

    //remove se for Demanda
    if (this.instanceOfDemanda(this.data)) {
      this.listaDemandasEscolhidas.push(this.data);
      for (let i of this.listaDemandas) {
        if (i.codigoDemanda == this.data.codigoDemanda) {
          this.listaDemandas.splice(this.listaDemandas.indexOf(i), 1);
        }
      }
    }

    //remove se for Demanda[]
    else {
      if (this.data.propostasReuniao)
        for (let i of this.data.propostasReuniao) {
          this.listaDemandasEscolhidas.push(i);
          for (let j of this.listaDemandas) {
            if (j.codigoDemanda == i.codigoDemanda) {
              this.listaDemandas.splice(this.listaDemandas.indexOf(j), 1);
            }
          }
        }
      this.setInformacoesPreDefinidas(this.data)
    }
  }


  setInformacoesPreDefinidas(reuniao: Reuniao) {
    this.comissaoSelecionada = reuniao.comissaoReuniao
    if(reuniao.dataReuniao)
    this.dataReuniao = new Date(reuniao.dataReuniao)
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  atualizarDemandas() {
    this.demandaService
      .getDemandasFiltradasStatus({ status1: StatusDemanda.ASSESSMENT + "", status2: StatusDemanda.BUSINESS_CASE + "" })
      .subscribe({
        next: demandas => {
          this.listaDemandas = demandas
          this.removerDaListaAdicSecundaria()
        }, error: err => {
          this.showError("Não foi possível filtrar as demandas")
        }
      });
  }


  dragEnd() {
    this.draggedDemanda = undefined;
  }

  findIndex(demanda: Demanda) {
    let index = -1;
    for (let i = 0; i < this.listaDemandas.length; i++) {
      if (demanda.codigoDemanda === this.listaDemandas[i].codigoDemanda) {
        index = i;
        break;
      }
    }
    return index;
  }

}
