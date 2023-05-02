import { HttpClient } from '@angular/common/http';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

export class WebSocketConnector {

    private stompClient: any;

    constructor(private topic: string, private onMessage: Function, private callbackError?: Function, private http?: HttpClient) {
        const errorCallback = callbackError || this.onError;
        this.connect(errorCallback);
    }

    private connect(errorCallback: Function) {
        console.log("Starting a WebSocket connection");
        const ws = new SockJS("http://localhost:8085/low/ws/info");
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, () => {
            this.inscrever();
        }, errorCallback.bind(this));
    };

    inscrever() {
        console.log("1");
        this.stompClient.subscribe(this.topic, (event: any) => {
            console.log("event");
            this.onMessage(event);
        });
    }


    send(destino: string, mensagem: string, codigoDemanda: string, codigoUsuario: string) {
        let mensagemDTO = {
            textoMensagens: mensagem,
            demandaMensagens: {
                codigoDemanda: codigoDemanda
            },
            usuarioMensagens: {
                codigoUsuario: codigoUsuario
            }
        }

        if (this.stompClient) {
            this.stompClient.send(



                destino, {}, JSON.stringify(mensagemDTO))
        } else {
            console.log("Conexão não estabelecida!")
        }
    }
    private onError(error: string) {
        console.log("Error while connect: " + error);
        setTimeout(() => {
            console.log("Trying to connect again...");
            this.connect(this.onError);
        }, 3000);
    }
}