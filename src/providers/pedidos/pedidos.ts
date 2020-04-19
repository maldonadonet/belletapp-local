import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { AlertController,Platform  } from 'ionic-angular';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { Storage } from '@ionic/storage';
import { PedidosPage,LoginPage} from '../../pages/index.paginas';
import 'rxjs/add/operator/map';
import { UsuarioService } from '../index.service'

@Injectable()
export class PedidosProvider {

    items:any[] = [];
    ordenes:any[] = [];
    productos:any[] = [];
    colores:any[] = [];
    precios:any[] = [];
    clientes:any[] = [];
    estatus:string;

    constructor(public http: HttpClient,
        private alertCtrl : AlertController,
        private platform : Platform,
        private storage: Storage,
        private _us:UsuarioService) {
        }

        // Metodo Guardar datos en el Storage
        private guardar_storage(){
            if( this.platform.is("cordova") ){
                this.storage.set('items', this.items );
            }else{
                localStorage.setItem("items", JSON.stringify( this.items ) );
            }
        }

        // Metodo Cargar datos del Storage
        cargar_storage(){
            let promesa = new Promise( ( resolve, reject )=>{
                if( this.platform.is("cordova") ){
                    this.storage.ready()
                    .then( ()=>{
                        this.storage.get("items")
                        .then( items =>{
                            if( items ){
                                this.items = items;
                            }
                            resolve();
                        })
                    })
                }else{
                    // computadora
                    if( localStorage.getItem("items") ){
                    //Existe items en el localstorage
                    this.items = JSON.parse( localStorage.getItem("items")  );
                }
                resolve();
            }
        });
        return promesa;
    }

    // Metodo: Obtener los pedidos del vendedor logeado
    obtener_pedidos(){
        let url = `${ URL_SERVICIOS }/pedidos/obtener_pedidos/${ this._us.token }/${ this._us.id_vendedor }`;

        this.http.get( url )
        .subscribe( data =>{

            let data_resp = data;

            if(data_resp["error"]){
                console.log("Encontro un error");
            }else{
                this.ordenes = data_resp["ordenes"]
                console.log(this.ordenes);
            }
        })
    }

    // Metodo: Realizar pago de los detalles
    cerrar_detalle( id_pedido:number, pago:number )
    {
        let url = `${ URL_SERVICIOS }pedidos/cerrar_pedido/${ this._us.token }/${ this._us.id_vendedor }`;

        return this.http.post(url,{id_pedido,pago})
        .map( resp=>{
            let data_resp = resp;
            if( data_resp["error"]){
                this.alertCtrl.create({
                    title:"Error al enviar datos",
                    subTitle : data_resp["mensaje"],
                    buttons:["Ok"]
                }).present();
            }else{
                this.alertCtrl.create({
                    title:"Se registro el pago satisfactoriamente",
                    subTitle : "Registro de pago",
                    buttons:["Ok"]
                }).present();
                this.estatus = data_resp["Estatus"];
            }
        });
    }

    //Listado de productos
    listado_productos()
    {
        let url = URL_SERVICIOS + "productos";

        this.http.get( url )
        .subscribe( data =>{
            let data_resp = data;
            if(data_resp["error"]){
                this.alertCtrl.create({
                    title:"Error al cargar los productos",
                    subTitle : "Verifique su conexion a internet",
                    buttons:["Ok"]
                }).present();
            }else{
                this.productos = data_resp["productos"];
            }
        })

    }

    // Metodo Precios por producto
    listado_precio_producto( id_cliente:any, id_producto:any)
    {
        let url = `${ URL_SERVICIOS }productos/precios_productos/${ id_cliente }/${ id_producto}`;
        //console.log("url: " + url);

        this.http.get( url )
        .subscribe( data =>{
            let data_resp = data;
            //console.log("Data de la api: " + data_resp["precio"]);
            if(data_resp["error"]){
                this.alertCtrl.create({
                    title:"Error al cargar la lista de precios",
                    subTitle : "Verifique su conexion a internet",
                    buttons:["Ok"]
                }).present();
            }else{
                this.precios = data_resp["precio"];
                console.log("Var de la Api: " + this.precios);
            }
        })
    }

    //Obtener los colores por producto
    listado_colores(id_producto:any)
    {
        let url = `${ URL_SERVICIOS }productos/obtener_colores/${ id_producto }`;

        this.http.get( url )
        .subscribe( data =>{
            let data_resp = data;
            if(data_resp["error"]){
                this.alertCtrl.create({
                    title:"Error al obtener el color de ese producto",
                    subTitle : "Verifique su conexion a internet",
                    buttons:["Ok"]
                }).present();
            }else{
                this.colores = data_resp["productos_colores"];
                console.log("Colores: " + this.colores);
            }
        })

    }

    // Metodo Lista de clientes por vendedor
    listado_clientes_vendedor()
    {
        let url = `${ URL_SERVICIOS }productos/clientes_vendedor/${ this._us.id_vendedor }`;
        console.log("Id_vendedor: " + this._us.id_vendedor);
        this.http.get( url )
        .subscribe( data =>{
            let data_resp = data;
            console.log(data_resp);
            if(data_resp["error"]){
                this.alertCtrl.create({
                    title:"Error al cargar la lista de clientes",
                    subTitle : "Verifique su conexion a internet",
                    buttons:["Ok"]
                }).present();
            }else{
                this.clientes = data_resp["clientes"];
                console.log("Datos del servicio[Clientes]: " + this.clientes);
            }
        })
    }

    crear_pedido(id_cliente:any,productos1:any,cantidades1:any,num_nota1:any,tipo_pago1:any,precios1:any,factura1:any,colores1:any,total1:any,totaldelpedido:any)
    {
        let productos,cantidades,num_nota,tipo_pago,precios,factura,colores,total:string;

        let url = `${ URL_SERVICIOS }pedidos/realizar_pedido/${ this._us.token }/${ this._us.id_vendedor }/${ id_cliente }`;

        productos = productos1.toString();
        cantidades = cantidades1.toString();
        num_nota = num_nota1.toString();
        tipo_pago = tipo_pago1.toString();
        precios = precios1.toString();
        factura = factura1.toString();
        colores = colores1.toString();
        total = total1.toString();

        console.log(productos);
        console.log(cantidades);
        console.log(num_nota);
        console.log(tipo_pago);
        console.log(precios);
        console.log(factura);
        console.log(colores);
        console.log(total);

        return this.http.post(url, {productos,cantidades,num_nota,tipo_pago,precios,factura,colores,total,totaldelpedido} )
        .map( resp=>{
            let data_resp = resp;
            console.log(data_resp);
            if( data_resp["error"]){
                this.alertCtrl.create({
                    title:"Error al enviar datos",
                    subTitle : data_resp["mensaje"],
                    buttons:["Ok"]
                }).present();
            }else{
                this.alertCtrl.create({
                    title:"Se registro el pedido Satisfactoriamente",
                    subTitle : "Registro de Pedido",
                    buttons:["Ok"]
                }).present();
                this.estatus = data_resp["Estatus"];
            }
        });
    }

}
