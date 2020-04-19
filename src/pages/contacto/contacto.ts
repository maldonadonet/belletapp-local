import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer';
import {} from ''

@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html',
})
export class ContactoPage {

  myForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private menuCtrl:MenuController,
              public formBuilder: FormBuilder,
              private emailComposer: EmailComposer) {
        this.myForm = this.createMyForm();

  }

  mostratMenu(){
    this.menuCtrl.toggle();
  }

  saveData(){
    // Enviar email
    console.log(this.myForm.value);
      let email = {
      to: 'maldonado.net@hotmail.com',
      subject: 'Reporte de Vendedores Bellet',
      body: "Nombre: " + this.myForm.value.name + "\n" + "Apellido: " + this.myForm.value.lastName + "\n" + "Email: " + this.myForm.value.email + "\n" + "Fecha de reporte: " + this.myForm.value.dateReport + "\n" + "Reporte: " + this.myForm.value.report,
      isHtml: true
    };

    console.log("Datos: "+ email.body);
    // Send a text message using default options
    this.emailComposer.open(email);
    //console.log("Datos: " + email.to);
  }

  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateReport: ['', Validators.required],
      report: ['',Validators.required]
    });
  }

}
