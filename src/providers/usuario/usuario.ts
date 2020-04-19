import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { AlertController,Platform } from 'ionic-angular';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { Storage } from '@ionic/storage';
import { PedidosPage,LoginPage} from '../../pages/index.paginas';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  token:string;
  id_vendedor:string;

  constructor(public http: HttpClient,
              private alertCtrl : AlertController,
              private platform : Platform,
              private storage: Storage
              ){
    console.log('Constructor UsuarioService.');
    this.cargar_storage();
  }

  usuario_activo():boolean{

    if(this.token){
      return true;
    }else{
      return false;
    }

  }

  ingresar( email:string, password:string){

    let url = URL_SERVICIOS + "/login";

    return this.http.post( url, {email,password} )
                    .map( resp=>{

                        let data_resp = resp;
                        console.log(data_resp);

                        if( data_resp["error"]){
                          this.alertCtrl.create({
                            title:"Error al Iniciar",
                            subTitle : data_resp["mensaje"],
                            buttons:["Ok"]
                          }).present();
                        }else{
                          this.token = data_resp["token"];
                          this.id_vendedor = data_resp["id_vendedor"];
                          console.log("token_usuario: ",this.token);
                          console.log("id_vendedor_usuario: ", this.id_vendedor);
                          // Guardar en el Storage.
                          this.guardar_storage();

                        }
                    });
  }

  cerrar_sesion(){
    this.token = null;
    this.id_vendedor = null;

    // Guardar en el Storage
    this.guardar_storage();


  }

  private guardar_storage(){
    if( this.platform.is("cordova")){
      // Device
      this.storage.set('token',this.token);
      this.storage.set('id_vendedor',this.id_vendedor);
    }else{
      // Desktop
      if(this.token){
        localStorage.setItem("token",this.token);
        localStorage.setItem("id_vendedor",this.id_vendedor);
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("id_vendedor");
      }

    }
  }

  cargar_storage(){
    let promesa = new Promise( (resolve,reject) =>{
        if(this.platform.is("cordova")){
          // Device
          this.storage.ready()
                      .then( ()=>{
                          this.storage.get("token")
                                      .then( token=>{
                                          if( token ){
                                            this.token = token;
                                          }
                                      })

                          this.storage.get("id_vendedor")
                          .then( id_vendedor=>{
                              if( id_vendedor ){
                                this.id_vendedor = id_vendedor;
                              }
                              resolve();
                          })
                      })
        }else{
          // Desktop
          if(localStorage.getItem("token")){
            this.token = localStorage.getItem("token");
            this.id_vendedor = localStorage.getItem("id_vendedor");
          }
          resolve();
        }
    });
    return promesa;
  }

}
