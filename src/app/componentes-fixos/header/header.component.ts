import { textoTutorial } from './../../telas/demandas/tela-inicial/textoDoTutorial';
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

  constructor(private rotasService: RotasService) { }
  mostrar_modal = false;
  textoTutorial = textoTutorial;
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  inicial = false;
  ngOnInit() {
    this.rotasService.titulo.subscribe((texto) => {
      this.items[0] = {label: "Home"},
      this.items[1] = { label: texto };
    })


    this.activeItem = this.items[0];
  }
}
