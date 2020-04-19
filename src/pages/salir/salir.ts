import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController, AlertController } from 'ionic-angular';
import { UsuarioService } from '../../providers/usuario/usuario'
import {LoginPage} from '../index.paginas';

@Component({
  selector: 'page-salir',
  templateUrl: 'salir.html',
})
export class SalirPage {
  loginpage = LoginPage;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _us:UsuarioService,
              private menuCtrl:MenuController,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalirPage');
  }

  salir(){
    this.showConfirm();
  }

  mostratMenu(){
    this.menuCtrl.toggle();
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Salir',
      message: '¿Realmente desea salir de la aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Salir',
          handler: () => {
            this._us.cerrar_sesion();
            this.navCtrl.push(this.loginpage);
          }
        }
      ]
    });
    confirm.present();
  }

}
