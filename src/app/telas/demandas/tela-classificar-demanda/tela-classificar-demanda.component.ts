import { Arquivo } from './../../../models/arquivo.model';
import { Demanda } from 'src/app/models/demanda.model';
import { DemandaService } from 'src/app/services/demanda.service';
import { Secao } from '../../../models/secao.model';
import { SecaoService } from '../../../services/secao.service';
import { BusinessUnitService } from './../../../services/business-unit.service';
import { BusinessUnit } from './../../../models/business-unit.model';
import { DemandaClassificadaService } from '../../../services/demanda-classificada.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDemandaDocumentoComponent } from 'src/app/modais/modal-demanda-documento/modal-demanda-documento.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalReprovacaoDemandaComponent } from 'src/app/modais/modal-reprovacao-demanda/modal-reprovacao-demanda.component';
import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { path } from 'src/app/services/path/rota-api';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-tela-classificar-demanda',
  templateUrl: './tela-classificar-demanda.component.html',
  styleUrls: ['./tela-classificar-demanda.component.scss'],
})
export class TelaClassificarDemandaComponent implements OnInit {

  openModalReprovacao() {
    this.matDialog.open(ModalReprovacaoDemandaComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: this.demanda
    });
  }

  path = path

  listaBUs = [
    { value: 'WMOI', nome: 'WMO-I – WEG Motores Industrial' },
    { value: 'WMOC', nome: 'WMO-C – WEG Motores Comercial' },
    { value: 'WEN', nome: 'WEN  – WEG Energia' },
    { value: 'WAU', nome: 'WAU – WEG Automação' },
    { value: 'WDS', nome: 'WDS – WEG Digital e Sistemas' },
    { value: 'WDC', nome: 'WDC – WEG Drives e Controls' },
    { value: 'WTI', nome: 'WTI – WEG Tintas' },
    { value: 'WTD', nome: 'WTD – WEG Transmissão e Distribuição' },
  ]

  demanda: Demanda | undefined = undefined
  demandaClassificadaForm = this.demandaClassificadaService.demandaClassificadaForm;
  selectedBUs: any;
  solicitanteAnalista: boolean = false;
  motivoDemandaPropria = "Os motivos não foram disponibilizados";

  opcoesDeTamanho = [
    {
      name: 'Muito Pequena',
      value: 'MuitoPequeno',
    },
    {
      name: 'Pequena',
      value: 'Pequeno',
    },
    {
      name: 'Média',
      value: 'Medio',
    },
    {
      name: 'Grande',
      value: 'Grande',
    },
    {
      name: 'Muito Grande',
      value: 'MuitoGrande',
    },
  ];

  listaSecoes = [
    { value: 'SVE', nome: 'SVE – Seção Desenvolvimento Sistemas de Vendas e E-commerce' },
    { value: 'SIM', nome: 'SIM – Seção Desenvolvimento Sistemas de manufatura' },
    { value: 'SIE', nome: 'SIE – Seção Desenvolvimento Sistemas de Engenhar' },
    { value: 'SDO', nome: 'SDO – Setor Desenvolvimento Plataforma Orchestra' },
    { value: 'SCO', nome: 'SCO – Seção Desenvolvimento Sistemas Corporativos' },
    { value: 'PTI', nome: 'PTI – Seção Projetos de TI' },
    { value: 'AGD', nome: 'AGD – Seção Arquitetura e Governança de Dados' },
    { value: 'STD', nome: 'STD – Seção Desenvolvimento Tecnologias Digitais' },
    { value: 'TIN', nome: 'TIN – Seção Tecnologia de Infraestrutura' },
    { value: 'SGI', nome: 'SGI – Seção Suporte Global Infraestrutura' },
    { value: 'SEG', nome: 'SEG – Seção Segurança da Informação e Riscos TI' },
    { value: 'AAS', nome: 'AAS – Atendimento e serviços TI – América do Sul' },
  ]

  codigoDemandaRota = this.activatedRoute.snapshot.params['codigoDemanda'];
  isFormClassificadaInvalid() {
    return this.demandaClassificadaService.isFormDemandaClassificadaInvalid;
  }


  constructor(
    private matDialog: MatDialog,
    private demandaClassificadaService: DemandaClassificadaService,
    private demandaService: DemandaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private usuarioService: UsuarioService
  ) {

    this.demandaService.getDemandaByCodigoDemanda(this.codigoDemandaRota).subscribe({
      next: (value) => {
        console.log(value)
        this.demanda = value;
        if(this.usuarioService.getCodigoUser() ==
        this.demanda.solicitanteDemanda?.codigoUsuario){
          this.solicitanteAnalista = true;
        }
      },
      error: (err) => {
        this.showError("Código não encontrado!")
      },
    });
    // this.isFormClassificadaInvalid =
  }

  dadosDemanda: Demanda | undefined;

  cancelarDemandaPropria() {
    this.confirmationService.confirm({
      dismissableMask: true,
      header: 'Cancelar Demanda',
      blockScroll: false,
      message: 'Tem certeza que deseja cancelar esta demanda?',
      accept: () => {
        this.demandaService.getDemandaByCodigoDemanda(this.codigoDemandaRota).subscribe({
          next: (value) => {
            console.log(value)
            this.dadosDemanda = value;

            if (this.dadosDemanda.codigoDemanda) {
              this.demandaService
                .reprovarDemanda(
                  parseInt(this.dadosDemanda.codigoDemanda),
                  this.motivoDemandaPropria
                )
                .subscribe({
                  next: event => {
                    this.showSuccess("Demanda cancelada com sucesso!")
                  },
                  error: err => {
                    this.showError("Não foi possivel cancelar a demanda!")
                  }
                });
            }
          },
          error: (err) => {
            this.showError("Código não encontrado!")
          },
        });
      },
    });
  }


  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


  onSubmitClassificacaoDemanda() {
    this.demandaClassificadaService.postClassificacaoDemanda(this.demanda?.codigoDemanda).subscribe({
      next: e => {
        this.showSuccess("Demanda classificada com sucesso")
        this.router.navigate(['/tela-inicial'])
      },
      error: err => {
        this.showError("Certifique-se do preenchimento de todos os campos!")
      }
    });
  }

  download(arquivo: Arquivo) {
    this.demandaService.saveByteArray(arquivo.dadosArquivo, arquivo.tipoArquivo, arquivo.nomeArquivo)
  }

  openModalDemandaDocumento() {
    this.matDialog.open(ModalDemandaDocumentoComponent, {
      maxWidth: '70vw',
      minWidth: '50vw',
      data: this.demanda,
    });
  }

  ngOnInit(): void {
    this.demandaClassificadaService.resetForm();
  }
}
