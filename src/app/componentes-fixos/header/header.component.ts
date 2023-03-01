import { NavigationEnd, Router } from '@angular/router';
import { NivelAcesso } from './../../models/nivel-acesso.enum';
import { textoTutorial } from '../../shared/textoDoTutorial';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { fadeAnimation } from 'src/app/shared/app.animation';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeAnimation]
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.items = [];
        const partes = event.url.split('/').slice(1);
        for(let i = 0; i < partes.length; i++){
          this.items.push({label: partes[i], url: partes[i]})

          if(i == 2){
            this.items[i].disabled = true;
            this.items[i-1].disabled = true;
          }else if(i == partes.length - 1){
            this.items[i].disabled = true;
          }
        }
      });
  }

  mostrar_modal = false;
  textoTutorial = textoTutorial;
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  inicial = false;
  nivelAcessoUsuario: NivelAcesso | undefined

  ngOnInit() {
      this.activeItem = this.items[0];
  }
}
