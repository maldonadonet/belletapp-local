import { Component } from '@angular/core';
import { Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage,PedidosPage,ClientesPage,ContactoPage,NosotrosPage,SalirPage } from '../pages/index.paginas';
import { UsuarioService } from '../providers/index.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  loginpage     = LoginPage;
  pedidospage   = PedidosPage;
  clientespage  = ClientesPage;
  contactopage  = ContactoPage;
  nosotrospage  = NosotrosPage;
  salirpage     = SalirPage;

  rootPage:any;
  

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen, 
              private _us:UsuarioService,
              private menuCtrl : MenuController
              ){
    platform.ready().then(() => {
      //this.rootPage=PedidosPage;
      if( this._us.usuario_activo() ){
        this.rootPage=PedidosPage;
      }else{
        this.rootPage=LoginPage;
      }
      setTimeout(() => {
          splashScreen.hide();
      }, 100);
      statusBar.styleDefault();
      
    });
  }

  openPage( pagina:any){
  
    this.rootPage = pagina;
    this.menuCtrl.close();
      
  }

  cerrar(){
    this.rootPage = this.loginpage;
    this._us.cerrar_sesion();
    this.menuCtrl.close();
    
  }

  
}

