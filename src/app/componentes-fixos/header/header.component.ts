import { UsuarioService } from './../../services/usuario.service';
import { NivelAcesso } from './../../models/nivel-acesso.enum';
import { textoTutorial } from '../../shared/textoDoTutorial';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RotasService } from 'src/app/services/rotas.service';
import { fadeAnimation } from 'src/app/shared/app.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeAnimation]
})
export class HeaderComponent implements OnInit {

  constructor(private rotasService: RotasService,
    private usuarioService: UsuarioService) {
      this.nivelAcessoUsuario = usuarioService.getRole();
    }

  mostrar_modal = false;
  textoTutorial = textoTutorial;
  items: MenuItem[] = [{label: "Tela Inicial"}, {label: "Demandas"}];
  activeItem: MenuItem | undefined;
  inicial = false;
  nivelAcessoUsuario: NivelAcesso | undefined

  ngOnInit() {


    this.rotasService.titulo.subscribe((texto) => {
      this.items[0] = {label: "Tela Inicial"},
      this.items[1] = { label: texto };
    })


    this.activeItem = this.items[0];
  }
}
