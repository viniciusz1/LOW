
import { FormBuilder, } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DemandaService } from './demanda.service';
import { UsuarioService } from './usuario.service';
@Injectable({
    providedIn: 'root',
})
export class RascunhoService {
    atualizarRascunho(indice: number) {
        if(indice == -1){
            let rascunhos = this.getRascunhos
            let valueFormDemanda = this.demandaService.getFormDemanda
            valueFormDemanda.codigoDemanda = rascunhos.length + 1
            rascunhos.push(valueFormDemanda)
            localStorage.setItem('rascunhos', JSON.stringify(rascunhos))
        }else{
            let rascunhos = this.getRascunhos
            rascunhos[indice] = this.demandaService.getFormDemanda
            rascunhos[indice].codigoDemanda = indice
            localStorage.setItem('rascunhos', JSON.stringify(rascunhos))
        }

        // console.log(indice)
        // if (indice == undefined) {
        //     let rascunhos = this.getRascunhos
        //     let valueFormDemanda = this.demandaService.getFormDemanda
        //     if (this.getSizeRascunho)
        //         valueFormDemanda.codigoDemanda = (this.getSizeRascunho + 1).toString();
        //     rascunhos.push(valueFormDemanda)
        //     console.log(rascunhos)
        //     localStorage.setItem('rascunhos', JSON.stringify(rascunhos))

        // } else {
        //     let listaRascunhos: any = localStorage.getItem('rascunhos')
        //     if (listaRascunhos[indice] == null) {
        //         listaRascunhos.push(this.demandaService.getFormDemanda)
        //     } else {
        //         listaRascunhos[indice] = this.demandaService.getFormDemanda
        //     }
        //     localStorage.setItem('rascunhos', JSON.stringify(listaRascunhos))
        // }
    }
    get getRascunhos() {
        let rasc = localStorage.getItem('rascunhos')
        if (rasc)
            return JSON.parse(rasc)
        else {
            return []
        }
    }

    get getSizeRascunho(): number {
        let rasc: any = localStorage.getItem('rascunhos')
        if (rasc) {
            rasc = JSON.parse(rasc)
            return rasc.length
        }
        else {
            return -1
        }
    }
    constructor(private http: HttpClient, private fb: FormBuilder, private demandaService: DemandaService, private usuarioService: UsuarioService) {

    }
}
