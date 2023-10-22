import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticated = false;

  constructor() {}

  async login(username: string, password: string): Promise<boolean> {
    // Obtén la lista de usuarios registrados desde Capacitor Preferences
    const usuariosExistentes = await Preferences.get({ key: 'usuarios' });

    if (usuariosExistentes.value) {
      const listaUsuarios = JSON.parse(usuariosExistentes.value);

      // Busca un usuario con las credenciales ingresadas
      const usuarioEncontrado = listaUsuarios.find(
        (usuario: any) => usuario.nombre === username && usuario.contrasena === password
      );

      if (usuarioEncontrado) {
        // Almacena el estado autenticado en Capacitor Preferences
        await Preferences.set({ key: 'authStatus', value: 'authenticated' });
        return true;
      }
    }

    return false;
  }

  logout(): void {
    // Elimina el estado autenticado de Capacitor Preferences al cerrar sesión
    Preferences.remove({ key: 'authStatus' });
  }

  async isAuthenticatedUser(): Promise<boolean> {
    // Verifica si el usuario está autenticado en Capacitor Preferences
    const authStatus = await Preferences.get({ key: 'authStatus' });
    return authStatus.value === 'authenticated';
  }
  
}
