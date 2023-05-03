import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  usuario = "";
  senha = "";

  constructor(private usuarioService: UsuarioService, private router: Router, private messageService: MessageService) { }

  autenticar() {
    this.usuarioService.autenticar(this.usuario, this.senha)
      .subscribe({
        next: user => {
          this.usuarioService.setUser(user)
          this.router.navigate(['/tela-inicial'])
        }, error: err => {
          this.showError('Usuário e/ou Senha Inválidos');
        }
      })
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  ngOnInit(): void {
  }

}
