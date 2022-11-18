import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pos-header',
  templateUrl: './pos-header.component.html',
  styleUrls: ['./pos-header.component.scss']
})
export class PosHeaderComponent implements OnInit {

  constructor(private location:Location) {
    this.location.onUrlChange(e => {
      console.log(e)
    })
    
   }
   currentRoute= "";
  titulo = 'Demandas'
  ngOnInit(): void {
    
  }

}
