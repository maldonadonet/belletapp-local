import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { AgregarpedidoPage } from '../index.paginas'


@Component({
  selector: 'page-add-clientes',
  templateUrl: 'add-clientes.html',
})

export class AddClientesPage {
    nombre : string = "";
    direccion : string = "";
    empresa : string = "";
    sucursales : string = "";
    telefono : string = "";
    email : string = "";
    rfc : string = "";
    lat : string = "";
    lng: string = "";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                private _cs:ClientesProvider) {
        this._cs.por_vendedor();
    }

    limpiar_datos(){
        this.nombre = "";
        this.direccion = "";
        this.empresa = "";
        this.sucursales = "";
        this.telefono = "";
        this.email = "";
        this.rfc = "";
        this.lat = "";
        this.lng = "";
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddClientesPage');
        this._cs.por_vendedor();
    }

    dismiss() {
        this.viewCtrl.dismiss();
        this._cs.por_vendedor();
    }

    enviar_cliente(){
        //this.obtener_coords();
        this._cs.registrar_cliente(this.nombre, this.direccion, this.empresa, this.sucursales, this.telefono, this.email,this.rfc, this.lat,this.lng)
        .subscribe(()=>{
            console.log("Cliente registrado exitosamente");
        });
        this.limpiar_datos();
        this.navCtrl.push(AgregarpedidoPage);

    }

    // obtener_coords(){
    //     this.nativeGeocoder.forwardGeocode(this.direccion)
    //     .then((coordinates: NativeGeocoderForwardResult[]) => {
    //         console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude);
    //         this.lat = coordinates[0].latitude;
    //         this.lng = coordinates[0].longitude;
    //         }
    //     )
    //     .catch((error: any) => console.log(error));
    // }






}
