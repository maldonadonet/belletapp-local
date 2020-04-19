import { Component } from '@angular/core';
import { NavController, NavParams,AlertController  } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos'


@Component({
  selector: 'page-detalle-pedidos',
  templateUrl: 'detalle-pedidos.html',
})

export class DetallePedidosPage {
  lat: number;
  lng: number;
  orden:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ps:PedidosProvider,
              public alertCtrl: AlertController) {
    this.orden = this.navParams.get("orden");
    this.lat = parseFloat( this.orden.lat);
    this.lng = parseFloat(this.orden.lng);
    console.log(this.orden);
    console.log("lat: " + this.lat);
    console.log("Lng: " + this.lng);
  }

  cerrar_pedido(id_pedido:number){
          this.showPrompt(id_pedido);
            // this._ps.cerrar_detalle(id_detalle,pago)
            // .subscribe( ()=>{
            //   // todo salio bien
            //   this._ps.estatus;
            //   console.log("estado del pedido: " + this._ps.estatus);
            //   this.navCtrl.pop();
            // })
  }

  showPrompt(id_pedido:number) {
    const prompt = this.alertCtrl.create({
      title: 'Agregar pago',
      message: "Digite la cantidad a abonar al pago del pedido",
      inputs: [
        {
          name: 'pago',
          placeholder: 'Pago al pedido'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Actualizar',
          handler: data => {
            console.log("id_pedido: " + id_pedido + " Pago: " + data['pago']);
            this._ps.cerrar_detalle(id_pedido,data['pago'])
            .subscribe( ()=>{
              this._ps.estatus;
              console.log("estado del pedido: " + this._ps.estatus);
              this.navCtrl.pop();
            })
          }
        }
      ]
    });
    prompt.present();
  }


}
