import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-detalle-cliente',
  templateUrl: 'detalle-cliente.html',
})
export class DetalleClientePage {
  
  lat: number;
  lng: number;

  orden:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orden = this.navParams.get("cliente");

    this.lat = parseFloat( this.orden.lat);
    this.lng = parseFloat(this.orden.lng);

    console.log(this.orden);
  }

 

}
