
import { FormBuilder, } from '@angular/forms';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DemandaService } from './demanda.service';
import { UsuarioService } from './usuario.service';
import { Demanda } from '../models/demanda.model';
import { PropostaService } from './proposta.service';
@Injectable({
    providedIn: 'root',
})
export class RascunhoService {
    
    set atualizarRascunhoDemanda(indice: number) {
        let rascunhos = this.getRascunhosDemanda
        rascunhos[indice] = this.demandaService.getFormDemanda
        rascunhos[indice].codigoDemanda = indice
        localStorage.setItem('rascunhos', JSON.stringify(rascunhos))
    }

    //Função inutilizada. Rascunho só para criação de demanda
    set atualizarRascunhoProposta(codigoDemanda: number){
        // let rascunhos: any[] = this.getRascunhosProposta
        // let indiceProposta: any = rascunhos.findIndex(e => e.codigoDemanda == codigoDemanda.toString())
        // if(indiceProposta != -1){
        //     rascunhos[indiceProposta] = this.propostaService.valueDemandaProposta
        // }else{
        //     rascunhos.push(this.propostaService.valueDemandaProposta)
        // }
        // console.log("atualizando rascunho")
        // localStorage.setItem('rascunhosProposta', JSON.stringify(rascunhos))
    }

    deleteRascunho(codigo: string) {
        let rascunhos = this.getRascunhosDemanda
        rascunhos.splice(parseInt(codigo), 1)
        localStorage.setItem('rascunhos', JSON.stringify(rascunhos))
    }

    get getRascunhosDemanda() {
        let rasc = localStorage.getItem('rascunhos')
        if (rasc)
            return JSON.parse(rasc)
        else {
            return []
        }
    }

    get getRascunhosProposta() {
        let rasc = localStorage.getItem('rascunhosPropostas')
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
    
    constructor(private demandaService: DemandaService, private propostaService: PropostaService) {

    }
}
