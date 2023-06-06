import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  dialogRefDemandaDocumento: MatDialogRef<any> | undefined; // Substitua 'any' pelo nome correto do seu modal "demanda documento"

  constructor() { }
}