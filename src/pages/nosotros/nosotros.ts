import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes'

@Component({
  selector: 'page-nosotros',
  templateUrl: 'nosotros.html',
})
export class NosotrosPage {
  lat: number = 19.4910035;
  lng: number = -99.0650489;
  marker:any[];
  baseDatos= [];
  element:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _cs: ClientesProvider,
              private menuCtrl:MenuController) {    
      function Cliente(lat,lng,empresa){
        this.lat = lat,
        this.lng=lng,
        this.empresa = empresa
      }
      this._cs.consultar_cliente().subscribe((data)=>{
        this.marker = this._cs.clientes;
        for(let mark of this.marker){
          this.element = new Cliente(parseFloat(mark.lat),parseFloat(mark.lng),mark.empresa);
          this.agregar();
        }
    });
  }

  ionViewWillEnter() {
    //this._cs.por_vendedor();
  }

  agregar(){
    this.baseDatos.push(this.element);
  }

  
  
  

  mostratMenu(){
    this.menuCtrl.toggle();
  }

}
