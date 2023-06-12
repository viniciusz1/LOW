import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-reuniao',
  templateUrl: './sidebar-reuniao.component.html',
  styleUrls: ['./sidebar-reuniao.component.scss']
})
export class SidebarReuniaoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isCollapsed: boolean = false;
  @Output() clicouNaSeta = new EventEmitter();
  @Output() clicouEmUmStatus = new EventEmitter();

  onClick() {
    this.isCollapsed = !this.isCollapsed;
    this.clicouNaSeta.emit();
  }

}
