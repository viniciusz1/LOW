import { JoyrideService } from 'ngx-joyride';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-perfil',
  templateUrl: './tela-perfil.component.html',
  styleUrls: ['./tela-perfil.component.scss']
})
export class TelaPerfilComponent implements OnInit {

  constructor(private joyrideService: JoyrideService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.joyrideService.startTour(
      {
        steps: ['bv@tela-inicial', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete'],
      }
    );
  }

}
