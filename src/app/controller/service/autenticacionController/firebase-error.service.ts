import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  handleFirebaseError(error: any): string {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'El correo electrónico proporcionado no es válido.';
      case 'auth/email-already-exists':
        return 'Este correo electrónico ya está en uso.';
      case 'auth/user-not-found':
        return 'No se encontró ningún usuario con las credenciales proporcionadas.';
      case 'auth/wrong-password':
        return 'La contraseña proporcionada es incorrecta.';
      case 'auth/invalid-credential':
        return 'Credenciales de inicio de sesión inválidas.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Por favor, inténtelo de nuevo más tarde.';
      default:
        return 'Ocurrió un error de autenticación. Por favor, inténtelo de nuevo más tarde.';
    }
  }

}
