import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { NivelAcesso } from './../../models/nivel-acesso.enum';
import { textoTutorial } from '../../shared/textoDoTutorial';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { fadeAnimation } from 'src/app/shared/app.animation';
import { filter } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotificacoesService } from 'src/app/services/notificacoes.service';
import { MessagesService } from 'src/app/websocket/messages.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeAnimation]
})

/*
  Este componente é o cabeçalho do sistema. Chamado no escopo-principal e no escopo-perfil.
  Tem algumas funções para trocar a exibição, quando por exemplo está na tela de login
*/

export class HeaderComponent implements OnInit {

  usuario: Usuario | undefined

  constructor(private translate: TranslateService, private router: Router,
    private usuarioService: UsuarioService,
    private notificacoesService: NotificacoesService,
    private messagesService: MessagesService) {
    this.messagesService.$qtdMensagensNaoLida.subscribe((codigoConversa: number) => {
      //Se não estiver na tela de chat, ele mostra a notificação
      if(this.router.url.includes("chat") == false){
        this.mensagemNova = true;

      }

    })

    //Tem o objetivo de setar as rotas em que o sistema se encontra, no caso os chamados breadcrummbs
    //Para isso ele fraciona a rota, e adiciona a uma lista
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.items = [];
        const partes = event.url.split('/').slice(1);
        for (let i = 0; i < partes.length; i++) {
          this.items.push({ label: partes[i], url: partes[i] })

          if (i == 2) {
            this.items[i].disabled = true;
            this.items[i - 1].disabled = true;
          } else if (i == partes.length - 1) {
            this.items[i].disabled = true;
          }
        }
      });
  }
  quantidadeNotificacoes: Number = 0;
  mensagemNova: boolean = false;;
  @ViewChild('modal') modalElement!: ElementRef;
  linkImagemPais = "https://www.gov.br/mre/pt-br/embaixada-seul/arquivos/imagens/BRASIL.png"
  mostrarModal = false;
  @Input() telaLogin = false;
  mostrar_modal = false;
  //Variável em que recebe o texto do tutorial
  textoTutorial = textoTutorial;
  //items que são exibidos nos breadcrumbs
  items: MenuItem[] = [];
  //item que fica ativo nos breadcrumbs
  activeItem: MenuItem | undefined;
  //?
  inicial = false;
  //?
  nivelAcessoUsuario: NivelAcesso | undefined
  //Função que é executada quando o componente inicia.
  firstClick = false;

  openModalNotificacoes() {
    console.log("abriu modal notificacoes")
    this.firstClick = true;
    if (this.mostrarModal == false) {
      this.mostrarModal = true;
    } else {
      this.mostrarModal = false;
    }
  }
  irParaMensagens(){
    this.mostrarModal = false;
    this.mensagemNova = false
    this.router.navigate(["/tela-inicial/chat"])
  }

  @HostListener('document:click', ['$event'])
  fecharModalAoClicarFora(event: MouseEvent) {
    if (this.firstClick == false) {
      if (this.mostrarModal == true) {
        if (!this.modalElement.nativeElement.contains(event.target)) {
          this.mostrarModal = false;
        }
      }
    } else {
      this.firstClick = false;
    }

  }

  versaoSolicitante() {
    if (this.usuarioService.getRole == "Solicitante") {
      return true;
    }
    return false;
  }

  versaoGerenteNegocio() {
    if (this.usuarioService.getRole == "GerenteNegocio") {
      return true;
    }
    return false;
  }


  sair() {
    this.usuarioService.logout().subscribe();
  }

  mudarIdioma(sigla: string, link: string) {
    this.linkImagemPais = link
    this.translate.use(sigla);
  }
  ngOnInit() {
    this.usuario = this.usuarioService.getUser('user')
    this.activeItem = this.items[0];
    document.addEventListener('click', this.fecharModalAoClicarFora);

    this.messagesService.verificaSeTemNotificacoes().subscribe((temNotificacoes) => {
      this.mensagemNova = temNotificacoes;
    })
    this.subscribeNotificationCount();
  }


  ngOnDestroy() {
    document.removeEventListener('click', this.fecharModalAoClicarFora);
  }


  subscribeNotificationCount() {
    this.notificacoesService.initializeWebSocketConnectionCount();
    this.notificacoesService.$notificationCountEmmiter.subscribe(quantidade => {
      // this.setarNotificacoes()
      this.quantidadeNotificacoes = quantidade;
    })
  }
}
