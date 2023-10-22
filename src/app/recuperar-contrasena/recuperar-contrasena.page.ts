import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage {
  usuario: string = '';
  nuevaContrasena: string = '';

  constructor(private alertController: AlertController, private router: Router) {}

  async cambiarContrasena() {
    if (!this.usuario || !this.nuevaContrasena) {
      this.mostrarAlerta('Campos Incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    // Cambiar la contraseña en el almacenamiento de Capacitor (Preferences)
    try {
      const userData = await Preferences.get({ key: 'usuarios' }); // Cambia la clave de acuerdo a tus datos

      if (userData.value) {
        const listaUsuarios = JSON.parse(userData.value);

        // Busca el usuario en la lista por nombre
        const usuarioIndex = listaUsuarios.findIndex((u: any) => u.nombre === this.usuario);

        if (usuarioIndex !== -1) {
          // Cambia la contraseña del usuario
          listaUsuarios[usuarioIndex].contrasena = this.nuevaContrasena;

          // Convierte la lista de usuarios a cadena JSON actualizada
          const listaUsuariosJSON = JSON.stringify(listaUsuarios);

          // Guarda la lista de usuarios actualizada en Capacitor Preferences
          await Preferences.set({ key: 'usuarios', value: listaUsuariosJSON }); // Cambia la clave de acuerdo a tus datos

          // Muestra un mensaje de éxito
          this.mostrarAlerta('Contraseña Cambiada', 'Tu contraseña ha sido cambiada con éxito.');

          // Puedes redirigir al usuario a la página de inicio u otra página relevante aquí.
        } else {
          this.mostrarAlerta('Usuario no encontrado', 'El usuario ingresado no existe.');
        }
      } else {
        this.mostrarAlerta('Usuarios no registrados', 'No hay usuarios registrados en el sistema.');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      this.mostrarAlerta('Error', 'Hubo un error al cambiar la contraseña.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            // Redirige al usuario a la página de inicio de sesión
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }
  
}