import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../servicios/authService';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  nombre: any;
  contrasena: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async ingresar() {
    const nombre = this.nombre;
    const contrasena = this.contrasena;

    if (await this.authService.login(nombre, contrasena)) {
      // Autenticación exitosa
      // Redirige al usuario a la página que desees, por ejemplo, '/inicio'
      this.router.navigate(['/inicio']);
    } else {
      this.mostrarAlerta('Datos incorrectos', 'Usuario o contraseña incorrectos');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}
