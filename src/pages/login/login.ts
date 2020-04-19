import { Component } from '@angular/core';
import { NavController, LoadingController,AlertController  } from 'ionic-angular';

import { UsuarioService } from '../../providers/index.service';
import { PedidosPage } from '../index.paginas';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email : string = "";
  password : string = "";

  constructor(public navCtrl: NavController,
              private _us:UsuarioService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

  }

  ingresar(){
    let loading = this.loadingCtrl.create({
      content: 'Iniciando Sesión...'
    });
  
    loading.present();    

    this._us.ingresar(this.email, this.password)
            .subscribe( ()=>{
              if(this._us.usuario_activo() ){
                console.log("todo salio bien");
                this.navCtrl.push(PedidosPage);
                loading.dismiss();
              }else{
                loading.dismiss();
                console.log("todo salio mal");
              }
            })
  }

}
