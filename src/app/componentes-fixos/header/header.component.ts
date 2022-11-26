import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private location:Location,
    private router: Router
    ) { }
  mostrar_modal = false;

  items: MenuItem[] = [];
  inicial = true;

  ngOnInit() {
    
    if(this.router.url != "/"){
      this.inicial = false;
    }
    // this.location.onUrlChange(e => {
    //   console.log(e)
    // })
      this.items = [
          {label:'Categories'},
          {label:'Sports'},
          {label:'Football'},
          {label:'Countries'}
      ];
  }
}
