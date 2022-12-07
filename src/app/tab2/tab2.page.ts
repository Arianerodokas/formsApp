import { Component } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

 listaUsuarios: Usuario[] = [];

 constructor(private storageService: StorageService) {}


async buscarUsuarios(){

this.listaUsuarios = await this.storageService.getAll();

}

ionViewDidEnter(){
  this.buscarUsuarios();

}

async excluirRegistro(email: string){

await this.storageService.remove(email);
this.buscarUsuarios();

}

}
