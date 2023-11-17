import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { GeolocationPosition, Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-contenido-qr',
  templateUrl: './contenido-qr.page.html',
  styleUrls: ['./contenido-qr.page.scss'],
})
export class ContenidoQrPage {

  qrContent: string | undefined;

  usuario: any;
  apellido: any;
  rut: any;
  region: any;
  comuna: any;

  selfie: any;

  latitud: string | undefined;
  longitud: string | undefined;

  async ngOnInit() {

    await this.obtenerUbicacion();

    const nombreResult = await Preferences.get({ key: 'nombreUsuario' });


    if (nombreResult.value) {
      this.usuario = nombreResult.value;
    }

    Preferences.get({ key: 'qrContent' })
      .then(result => {
        if (result.value) {
          this.qrContent = result.value;
        }
      });

  }

  obtenerUbicacion() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitud = position.coords.latitude.toString();
        this.longitud = position.coords.longitude.toString();
      });
    }
  }

  // Función para convertir coordenadas decimales a DMM
  convertirADMM(coordenada: number): string {
    const grados = Math.floor(coordenada);
    const minutosDecimal = (coordenada - grados) * 60;
    const minutos = minutosDecimal.toFixed(4);
    return `${grados}° ${minutos}'`;
  }

}