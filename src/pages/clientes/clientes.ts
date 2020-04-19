import { Component } from '@angular/core';
import { NavController, NavParams,MenuController,ModalController } from 'ionic-angular';
// Servicios
import { UsuarioService } from '../../providers/index.service';
import { ClientesProvider } from '../../providers/clientes/clientes'
// Paginas
import {DetalleClientePage,AddClientesPage } from '../index.paginas'

@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {

  detallecliente = DetalleClientePage;
  clientes:any[] =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _us:UsuarioService,
              private _cs:ClientesProvider,
              private menuCtrl:MenuController,
              public modalCtrl: ModalController
              ) {
      this._cs.por_vendedor();
  }

      ionViewWillEnter(){
        console.log("Cargando Cliente..");
        this._cs.por_vendedor();
      }
      ionViewDidEnter(){
          console.log("Cargando Cliente..");
          this._cs.por_vendedor();
      }
      ionViewDidLoad(){
          console.log("Cargando Cliente..");
          this._cs.por_vendedor();
      }

    agregar_cliente(){
        const modal = this.modalCtrl.create(AddClientesPage);
        modal.present();
    }


  mostratMenu(){
    this.menuCtrl.toggle();
  }

  actualizar(){
      this._cs.por_vendedor();
  }



}
