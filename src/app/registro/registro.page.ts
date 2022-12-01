import { Tab1Page } from './../tab1/tab1.page';
import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './../models/Usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  formRegistro: FormGroup;
  usuario: Usuario = new Usuario();

  mensagens = {

    nome: [

      { tipo: 'required', mensagem: 'O campo do Nome é obrigatório!' },
      { tipo: 'minlength', mensagem: 'O campo do Nome precisa ter pelo menos 3 caracteries!' },
    ],

    cpf: [
      { tipo: 'required', mensagem: 'O campo do CPF é obrigatório!' },
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo do email é obrigatório!' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'O campo da senha é obrigatório!' },
      { tipo: 'minlength', mensagem: 'O campo da senha tem quer no minimo 6 caracteries' },
      { tipo: 'maxlength', mensagem: 'O campo da senha tem quer no máximo 8 caracteries' },

    ],
    confirmaSenha: [
      { tipo: 'required', mensagem: 'O campo de confirmar senha é obrigatório!' },
      { tipo: 'minlength', mensagem: 'O campo de confirmar senha tem quer no minimo 6 caracteries' },
      { tipo: 'maxlength', mensagem: 'O campo de confirmar senha tem quer no máximo 8 caracteries' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router) {

    this.formRegistro = this.formBuilder.group({

      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],

    });

  }

  ngOnInit() {
  }

  async salvarRegistro() {
    if (this.formRegistro.valid) {
      this.usuario.nome = this.formRegistro.value.nome;
      this.usuario.cpf = this.formRegistro.value.cpf;
      this.usuario.email = this.formRegistro.value.email;
      this.usuario.senha = this.formRegistro.value.senha;
      await this.storageService.set(this.usuario.email, this.usuario);
      this.route.navigateByUrl('/tabs/tab2');
    } else {
      alert('Formulário inválido!');
    }
  }


}
