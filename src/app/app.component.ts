import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'low';
  position_list_cards = 0

  changeRight(){
    this.position_list_cards -= 700
  }

  changeLeft() {
    this.position_list_cards += 700
  }
}
