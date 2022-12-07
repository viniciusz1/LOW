import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RotasService } from 'src/app/services/rotas.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pos-header',
  templateUrl: './pos-header.component.html',
  styleUrls: ['./pos-header.component.scss']
})
export class PosHeaderComponent implements OnInit {

  constructor(private rotasService: RotasService) { }

  mostrar_modal = false;
  items: MenuItem[] = [{label: "Demandas"}];
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.rotasService.titulo.subscribe((texto) => {
      this.items[0] = { label: texto };
    })


    this.activeItem = this.items[0];
  }
}
