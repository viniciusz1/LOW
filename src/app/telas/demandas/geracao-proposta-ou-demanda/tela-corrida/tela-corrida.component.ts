import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
@Component({
  selector: 'app-tela-corrida',
  templateUrl: './tela-corrida.component.html',
  styleUrls: ['./tela-corrida.component.scss']
})
export class TelaCorridaComponent implements OnInit {

  aparecer = 1;

  constructor() { }

  ngOnInit(): void {
  }

  chamarAnalista(tipo: number){ 
    if(tipo >= 0 && tipo <= 1){
      this.aparecer == tipo;
    } else {
      console.log("Tipo incompativel")
    }
  }

  editor: Editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
