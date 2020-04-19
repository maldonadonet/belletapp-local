import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Servicios
import { PedidosProvider } from '../../providers/pedidos/pedidos'


@Component({
    selector: 'page-agregarpedido',
    templateUrl: 'agregarpedido.html',
})
export class AgregarpedidoPage {

    clienteSeleccionado: string  = '0';
    productoSeleccionado: string = '0';
    idcliente: string = '0';
    verProducto: string = '';
    cantidad:number=0;
    t_precio:number=0;
    tipo_precio:number=0;
    precio:any;
    facturar:string='';
    total:number=0;
    listadoprecios:any[]=[];
    numnota:number=0;
    color:string="";
    activo:boolean = false;
    totaldelpedido:number=0;
    data:string = "";

    // Arrays
    productos:any[]=[];
    cantidades:any[]=[];
    num_nota:any[]=[];
    tipo_pago:any[]=[];
    precios:any[]=[];
    factura:any[]=[];
    totales:any[]=[];
    colores:any[]=[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private _ps:PedidosProvider) {

    }

    ionViewWillEnter(){
        console.log("Cargando Clientes:");
        this._ps.listado_clientes_vendedor();
        this._ps.listado_productos();

    }

    obtener_cliente() {
        this.idcliente = this.clienteSeleccionado;
        console.log("Id_cliente: " + this.idcliente);
    }

    capturar_producto(){
        this.verProducto = this.productoSeleccionado;
        this._ps.listado_precio_producto( this.idcliente, this.verProducto);
        this._ps.listado_colores(this.verProducto);

        this.listadoprecios = this._ps.precios;

        console.log("mi var: " + this.listadoprecios["precio"]);

        this.precio = this.listadoprecios;


    }


    // capturar_tipoPrecio(){
    //     this._ps.listado_precio_producto(this.verProducto);
    //     this.listadoprecios = this._ps.precios;
    //     if(this.tipo_precio == 1){
    //         this.precio = this.listadoprecios["pUnitario"];
    //     }else if( this.tipo_precio == 2 ){
    //         this.precio = this.listadoprecios["pDistribuidor"];
    //     }else if( this.tipo_precio == 3 ){
    //         this.precio = this.listadoprecios["pMayorista"];
    //     }
    //     console.log(this.listadoprecios);
    // }

    capturar_facturar(){
        let total1:number;
        if(this.facturar == "si"){
            total1 = this.cantidad * this.precio;
            this.total = total1 + (total1 * .16);
        }else{
            total1 = this.cantidad * this.precio;
            this.total = total1 ;
        }
        console.log(this.facturar);
    }

    agregar_movimiento(){

        this.productos.push(this.verProducto);
        this.cantidades.push(this.cantidad);
        this.numnota=this.numnota+1;
        this.num_nota.push(this.numnota);
        this.tipo_pago.push("Efectivo");
        this.precios.push(this.precio);
        this.factura.push(this.facturar);
        this.totales.push(this.total);
        this.totaldelpedido = this.totaldelpedido + this.total;
        this.colores.push(this.color);

        this.productoSeleccionado = null;
        this.tipo_precio = null;
        this.cantidad = null;
        this.precio = null;
        this.facturar = null;
        this.total = null;
        this.color = null;
        this.activo = true;

        console.log(this.productos);
        console.log(this.cantidades);
        console.log(this.num_nota);
        console.log(this.tipo_pago);
        console.log(this.precios);
        console.log(this.factura);
        console.log(this.totales);
        console.log(this.colores);
        console.log(this.totaldelpedido);

    }

    finalizar_pedido(){
          console.log("Total del pedido: ",this.totaldelpedido);


          this._ps.crear_pedido(this.idcliente,this.productos,this.cantidades,this.num_nota,this.tipo_pago,this.precios,this.factura,this.colores,this.totales,this.totaldelpedido).subscribe(()=>{
            console.log("Pedido Exitoso");
            });
            this.navCtrl.pop();

    }

    salir(){
        this.navCtrl.pop();
    }

    actualizar(){
        console.log("Cargando Clientes:");
        this._ps.listado_clientes_vendedor();
        this._ps.listado_productos();
    }
    }
