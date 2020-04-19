import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
// Servicios
import { UsuarioService } from '../../providers/index.service';
import { PedidosProvider } from '../../providers/pedidos/pedidos'
// Paginas
import { LoginPage,DetallePedidosPage,AgregarpedidoPage } from '../index.paginas'


@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  detallepage = DetallePedidosPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _us:UsuarioService,
              private _ps:PedidosProvider,
              private menuCtrl:MenuController) {
        this._ps.obtener_pedidos();
  }

  ionViewWillEnter(){
    console.log("Cargando Ordenes..");
    this._ps.obtener_pedidos();
  }
  ionViewDidEnter(){
      console.log("Cargando Ordenes..");
      this._ps.obtener_pedidos();
  }
  ionViewDidLoad(){
      console.log("Cargando Ordenes..");
      this._ps.obtener_pedidos();
  }

  cerrar(){
    this._us.cerrar_sesion();
    this.navCtrl.push(LoginPage);
  }

  mostratMenu(){
    this.menuCtrl.toggle();
  }

  crear_pedido(){
    this.navCtrl.push(AgregarpedidoPage);
  }


}
