import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { AlertController,Platform } from 'ionic-angular';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { Storage } from '@ionic/storage';
import { PedidosPage,LoginPage} from '../../pages/index.paginas';
import 'rxjs/add/operator/map';
import { UsuarioService } from '../index.service'

@Injectable()
export class ClientesProvider {

  clientes:any[] = [];
  items:any[] = [];
  token:string;
  id_vendedor:string;
  perfil:string;

  constructor(public http: HttpClient,
              private alertCtrl : AlertController,
              private platform : Platform,
              private storage: Storage,
              private _us:UsuarioService) {

      console.log('Iniciando Servicio de Clientes..');
      this.cargar_storage();
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
                                            console.log("token_funcion: ", this.token);
                                          }
                                      })

                          this.storage.get("id_vendedor")
                          .then( id_vendedor=>{
                              if( id_vendedor ){
                                this.id_vendedor = id_vendedor;
                                console.log("id_vendedor_funcion: ", this.id_vendedor);
                              }
                              resolve();
                          })
                      })
        }else{
          // Desktop
          if(localStorage.getItem("token")){
            this.token = localStorage.getItem("token");
            console.log("token: ", this.token);
            this.id_vendedor = localStorage.getItem("id_vendedor");
            console.log("id_vendedor: ", this.id_vendedor);
          }
          resolve();
        }
    });
    return promesa;
  }


  por_vendedor(){

    this.cargar_storage();
    console.log("id_vendedor del service: " + this.id_vendedor);
    
    let url = URL_SERVICIOS + "clientes/por_vendedor/" + this.id_vendedor;
    console.log("Url: " + url);

    return this.http.get( url )
              .subscribe( data =>{
                if(data["error"]){
                  console.log("Ocurrieron algunos errores al consultar la lista de clientes. Favor de intentar mas tarde");
                }else{
                  this.clientes = data["cliente"];
                  console.log("Clientes: " + data["cliente"]);
                }
        });


  }

  registrar_cliente(nombre:string, direccion:string, empresa:string, sucursales:string, telefono:string, email:string, rfc:string, lat:string, lng:string){

      let url = `${ URL_SERVICIOS }clientes/registrar_clientes`;
      let id_vendedor = this.id_vendedor;
      return this.http.post(url, {nombre,direccion,empresa,sucursales,telefono,email,rfc,lat,lng,id_vendedor} )
      .map( resp=>{
          let data_resp = resp;
          console.log(data_resp);
          if( data_resp["error"]){
              this.alertCtrl.create({
                  title:"Error al enviar datos, Verifica los datos enviados",
                  subTitle : data_resp["mensaje"],
                  buttons:["Ok"]
              }).present();
          }else{
              this.alertCtrl.create({
                  title:"Se registro el cliente satisfactoriamente",
                  subTitle : "Registro de Clientes",
                  buttons:["Ok"]
              }).present();
          }
      });
  }

  consultar_cliente(){
    let url = URL_SERVICIOS + "clientes/por_vendedor/" + this.id_vendedor;
    let id_vendedor = this.id_vendedor;
    return this.http.get(url)
    .map( resp=>{
        let data_resp = resp;
        console.log(data_resp);
        if( data_resp["error"]){
            
        }else{
          this.clientes = data_resp["cliente"];    
        }
    });
}

    perfil_vendedor(){
        let url = URL_SERVICIOS + "vendedores/perfil/" + this.id_vendedor;

        this.http.get( url )
        .subscribe( data =>{
            let data_resp = data;
            if(data_resp["error"]){
                this.alertCtrl.create({
                    title:"Error al obtener la información del vendedor",
                    subTitle : "Favor de intentar más tarde",
                    buttons:["Ok"]
                }).present();
            }else{
                this.perfil = data_resp["vendedor"];
            }
        })
    }

}
