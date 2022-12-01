import { Recurso } from './../../../../models/recurso.model';
import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { MessageService, SelectItem } from 'primeng/api';
import { TipoDespesa } from 'src/app/models/tipoDespesa.enum';
import { ScrollSpyService } from 'ng-spy';


@Component({
  selector: 'app-tela-corrida',
  templateUrl: './tela-corrida.component.html',
  styleUrls: ['./tela-corrida.component.scss']
})
export class TelaCorridaComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
    doSomething() {
      // console.debug("Scroll Event", document.body.scrollTop);
      // see András Szepesházi's comment below
      console.debug("Scroll Event", window.pageYOffset );
    }

  aparecer = 1;
  uploadedFiles: any[] = [];
  constructor(private messageService: MessageService,
    private spyService: ScrollSpyService) { }

  ngOnInit(): void {
  }

  opcoesDeTamanho = [
    {name:'Muito Pequena'},
    {name:'Pequena'},
    {name:'Média'},
    {name:'Grande'},
    {name:'Muito Grande'}
  ]

  // onUpload(event) {
  //       for(let file of event.files) {
  //           this.uploadedFiles.push(file);
  //       }

  //       this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  //   }

  chamarAnalista(tipo: number){
    if(tipo >= 0 && tipo <= 1){
      this.aparecer == tipo;
    } else {
    }
  }

  activeTarget: string = "";

  setActiveTarget(targetName: string) {
    this.activeTarget = targetName;
  }
  ngAfterViewInit() {
    this.spyService.spy({ thresholdBottom: 50 });
    this.spyService.activeSpyTarget.subscribe(
      (activeTargetName: string) => console.log(activeTargetName)
    );
  }


  recursos: Recurso[] = [{id: "1", nomeRecurso: "Recurso 1", tipoDespesa: TipoDespesa.EXTERNO, perfilDespesa: "Perfil 1", quantidadeHoras: 1, valorHora: 1, valorTotalDespesa: 1, periodoExMeses: 1, centrosCustoPagantes: []}, ]
  clonedRecursos: { [s: string]: Recurso; } = {};
  editor: Editor = new Editor();
  statuses: SelectItem[] = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}];

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

  onRowEditInit(product: Recurso) {
    this.clonedRecursos[product.id] = {...product};
}

onRowEditSave(product: Recurso) {
        delete this.clonedRecursos[product.id];
        this.messageService.add({severity:'success', summary: 'Success', detail:'Recurso is updated'});
}

onRowEditCancel(product: Recurso, index: number) {
    this.recursos[index] = this.clonedRecursos[product.id];
    delete this.clonedRecursos[product.id];
}

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
