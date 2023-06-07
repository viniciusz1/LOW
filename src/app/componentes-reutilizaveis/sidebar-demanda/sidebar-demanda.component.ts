import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-sidebar-demanda',
  templateUrl: './sidebar-demanda.component.html',
  styleUrls: ['./sidebar-demanda.component.scss']
})
export class SidebarDemandaComponent implements OnInit {

  ngOnInit(): void {
  }
  @Output() clicouNaSeta = new EventEmitter<string>();
  @Output() clicouEmUmStatus = new EventEmitter();

  onClick() {
    this.isCollapsed = !this.isCollapsed;
    this.clicouNaSeta.emit();
  }

  centered = false;
  disabled = false;
  unbounded = false;
  isCollapsed: boolean = false;
  radius: number = 0;
  color: string = 'black';
}
