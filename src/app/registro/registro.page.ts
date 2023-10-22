import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss']
})
export class RegistroPage implements OnInit {
  nombre: string | undefined;
  apellido: string | undefined;
  rut: string | undefined;
  regiones: any[] = [];
  comunas: any[] = [];
  contrasena: string | undefined;
  regionSeleccionada: any;
  comunaSeleccionada: any;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.obtenerRegiones();
  }

  obtenerRegiones() {
    this.apiService.obtenerRegiones().subscribe(
      (data: any) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error al obtener regiones:', error);
      }
    );
  }

  obtenerComunas(regionId: number) {
    const url = `https://dev.matiivilla.cl/duoc/location/comuna/${regionId}`;
    this.http.get(url).subscribe(
      (response: any) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.comunas = response.data;
        } else {
          console.error('La respuesta no contiene un arreglo de comunas válido.');
        }
      },
      (error) => {
        console.error('Error al obtener comunas:', error);
      }
    );
  }

  async registrarUsuario() {
    if (!this.nombre || !this.apellido || !this.rut || !this.regionSeleccionada || !this.comunaSeleccionada || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Campos Incompletos',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      region: this.regionSeleccionada,
      comuna: this.comunaSeleccionada,
      contrasena: this.contrasena
    };
  
    try {
      const usuariosExistentes = await Preferences.get({ key: 'usuarios' });
      const listaUsuarios = usuariosExistentes.value ? JSON.parse(usuariosExistentes.value) : [];
  
      // Agrega el usuario nuevo
      listaUsuarios.push(usuario);
  
      const listaUsuariosJSON = JSON.stringify(listaUsuarios);
  
      // Guarda la lista de usuarios en Capacitor Preferences
      await Preferences.set({ key: 'usuarios', value: listaUsuariosJSON });
  
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Usuario registrado con éxito',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/login']);
            },
          },
        ],
      });
  
      await alert.present();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  }
  

}
