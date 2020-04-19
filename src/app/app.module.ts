import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
// Herramientas
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
// Servicios
import { PedidosProvider } from '../providers/pedidos/pedidos';
import { UsuarioService } from '../providers/usuario/usuario';
// Paginas
import {LoginPage, PedidosPage, DetallePedidosPage,ClientesPage,ContactoPage,NosotrosPage,SalirPage,DetalleClientePage, AgregarpedidoPage, AddClientesPage} from '../pages/index.paginas';
// Maps
import { AgmCoreModule } from '@agm/core';
import { ClientesProvider } from '../providers/clientes/clientes';
// Email
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PedidosPage,
    DetallePedidosPage,
    ClientesPage,
    ContactoPage,
    NosotrosPage,
    SalirPage,
    DetalleClientePage,
    AgregarpedidoPage,
    AddClientesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDEKjnfuFwQdfBg3Azt1GLf9xfCOcri23A'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PedidosPage,
    DetallePedidosPage,
    ClientesPage,
    ContactoPage,
    NosotrosPage,
    SalirPage,
    DetalleClientePage,
    AgregarpedidoPage,
    AddClientesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioService,
    HttpClientModule,
    PedidosProvider,
    ClientesProvider,
    EmailComposer,
    SplashScreen
  ]
})
export class AppModule {}
