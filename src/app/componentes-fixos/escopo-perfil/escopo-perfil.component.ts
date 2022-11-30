import { JoyrideService } from 'ngx-joyride';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escopo-perfil',
  templateUrl: './escopo-perfil.component.html',
  styleUrls: ['./escopo-perfil.component.scss']
})
export class EscopoPerfilComponent implements OnInit {

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
