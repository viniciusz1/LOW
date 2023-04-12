import { Component, Input, OnInit } from '@angular/core';
interface Tab {
  title: string;
  content: string;
}
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() tabs: Tab[] = [];
  @Input() activeIndex: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
