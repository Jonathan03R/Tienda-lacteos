import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, authState, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { Router } from '@angular/router';
import { User, UserLogin } from '../../../model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth);

  // firestore = inject(AngularFirestore);
  router = inject(Router);

  constructor() {}

  getAuth() {
    return getAuth();
  }

  logearse(user: UserLogin) {
    return signInWithEmailAndPassword(
      getAuth(),
      user.Usuariocorreo_electronico,
      user.Usuariocontrasena
    );
  }

  registrarse(user: User) {
    return createUserWithEmailAndPassword(
      getAuth(),
      user.Usuariocorreo_electronico,
      user.Usuariocontrasena
    );
  }

  iniciarSesionConGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(this.auth, provider);
  }

  async handleGoogleRedirect(): Promise<string | null> {
    try {
      const result = await getRedirectResult(this.auth);
      if (result) {
        const email = result.user?.email || null;
        return email;
      }
      return null;
    } catch (error) {
      console.error('Error handling Google redirect', error);
      throw error;
    }
  }

  cerrarSesion() {
    const auth = getAuth();
    return signOut(auth);
  }
}
