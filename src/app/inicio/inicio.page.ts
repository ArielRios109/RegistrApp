import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario: any;
  selfie: string | undefined;
  qrContent: string | undefined;
  apellido: any;
  rut: any;
  region: any;
  comuna: any;

  constructor(private router: Router) { }

  async ngOnInit() {
    // Obtiene el nombre de usuario almacenado en Capacitor Preferences
    const { value } = await Preferences.get({ key: 'nombreUsuario' });
    this.usuario = value;

  }

  openCamera() {
    const constraints = { video: { facingMode: 'environment' } };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      const video = document.getElementById('video') as HTMLVideoElement;
      if (video) {
        video.srcObject = stream;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          video.onplay = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const scanQR = () => {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const decodedQR = jsQR(imageData.data, imageData.width, imageData.height);
              if (decodedQR) {
                this.qrContent = decodedQR.data;
                //guarda el qrContent en capacitor preferences
                this.guardarQrContent();

                //redirige despues de escanear un qr
                this.router.navigate(['/tomar-selfie'], {
                });
              }
              requestAnimationFrame(scanQR);
            };
            requestAnimationFrame(scanQR);
          };
        }
      }
    }).catch((error) => {
      console.error('Error al acceder a la cámara:', error);
      alert('No se pudo acceder a la cámara.');
    });
  }

  async guardarQrContent() {
    try {
      if (this.qrContent) {
        await Preferences.set({ key: 'qrContent', value: this.qrContent });
      }
    } catch (error) {
      console.error('Error al guardar el código QR en Capacitor Storage:', error);
    }
  }
}