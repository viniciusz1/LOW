
import { FormBuilder, NumberValueAccessor } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filtro } from '../models/filtro.model';

@Injectable({
  providedIn: 'root',
})
export class FiltroService {
  public static filtroData: Filtro | undefined 
  constructor() {}
}
