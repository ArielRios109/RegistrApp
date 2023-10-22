import { Component, OnInit} from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tomar-selfie',
  templateUrl: './tomar-selfie.page.html',
  styleUrls: ['./tomar-selfie.page.scss'],
})
export class TomarSelfiePage implements OnInit {

  selfie: string | undefined;
  openCamera: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    Camera.requestPermissions();
  }

  async tomarFoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    
    this.selfie = image.webPath;

    // Guarda la foto capturada en Capacitor Preferences
    await Preferences.set({ key: 'selfie', value: this.selfie as string });

    // Después de guardar la foto, puedes navegar a la página de contenido-qr
    this.router.navigate(['/contenido-qr']);
}

}