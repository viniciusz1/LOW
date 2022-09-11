import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-demanda',
  templateUrl: './sidebar-demanda.component.html',
  styleUrls: ['./sidebar-demanda.component.scss']
})
export class SidebarDemandaComponent implements OnInit {
  showSidebar = -0;
  constructor() { }
  moveSidebar(){
    if(this.showSidebar == 0){
      this.showSidebar = -25
    }else{
      this.showSidebar = 0
    }
  }
  ngOnInit(): void {
  }

}
