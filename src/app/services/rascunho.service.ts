
import { FormBuilder, } from '@angular/forms';
import { path } from './path/rota-api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Demanda } from '../models/demanda.model';
import { PropostaService } from './proposta.service';
import { DemandaService } from './demanda.service';
@Injectable({
    providedIn: 'root',
})
export class RascunhoService {

    set atualizarRascunhoDemanda(indice: number) {
        console.log("Esta aqui")
        if(indice != 0){
            console.log("Atualizou")
        // let rascunho = this.getRascunhoDemanda(indice)
        let rascunhoNovo: any = this.demandaService.getFormDemanda
        console.log(rascunhoNovo.value)
        rascunhoNovo.value.codigoDemanda = indice
        let demandaFormData = new FormData();
        if (this.demandaService.arquivos.length != 0) {
            this.demandaService.arquivos.map((item) =>
            demandaFormData.append('arquivos', item, item.name)
            );
          } else {
            demandaFormData.append('arquivos', new File([], ''));
          }
          demandaFormData.append('rascunho', JSON.stringify(rascunhoNovo.value))
          
        this.putRascunhoDemanda(demandaFormData).subscribe()
        }else{
            console.log("Criou")
        this.postRascunhoDemanda()
        }
        // localStorage.setItem('rascunhos', JSON.stringify(rascunhos))
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

    // deleteRascunho(codigo: string) {
    //     let rascunhos = this.getRascunhosDemanda
    //     rascunhos.splice(parseInt(codigo), 1)
    //     localStorage.setItem('rascunhos', JSON.stringify(rascunhos))
    // }

    getRascunhosDemanda(indice: number) {
        return this.http.get<Demanda | string>(path + 'demanda/versoes/' + indice);
    }

    getRascunhoDemanda(indice: number) {
        return this.http.get<Demanda>(path + 'demanda/' + indice);
    }
    
    postRascunhoDemanda() {
        let demanda: Demanda = {};
        return this.http.post<Demanda>(path + 'rascunho', demanda)
    }

    putRascunhoDemanda(demanda: FormData) {
        return this.http.put<Demanda>(path + 'rascunho/update', demanda)
    }

    deleteRascunhoDemanda(codigo: string) {
        return this.http.delete<string>(path + 'rascunho/' + codigo)
    }

    // get getSizeRascunho(): number {
    //     let rasc: any = localStorage.getItem('rascunhos')
    //     if (rasc) {
    //         rasc = JSON.parse(rasc)
    //         return rasc.length
    //     }
    //     else {
    //         return -1
    //     }
    // }

    constructor(private demandaService: DemandaService, private propostaService: PropostaService, private http: HttpClient) {

    }
}
