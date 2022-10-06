import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-demanda',
  templateUrl: './card-demanda.component.html',
  styleUrls: ['./card-demanda.component.scss'],
  providers: [NgbDropdownConfig]
})
export class CardDemandaComponent implements OnInit {

  constructor(config: NgbDropdownConfig) {
      config.placement='top-start'
   }

  ngOnInit(): void {
  }

}
