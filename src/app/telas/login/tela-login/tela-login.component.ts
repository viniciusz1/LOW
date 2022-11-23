import { Component, OnInit } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  usuario = "";
  senha = "";

  constructor() { }

  ngOnInit(): void {
  }

}
