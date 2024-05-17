import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, authState, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
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

  cerrarSesion() {
    const auth = getAuth();
    return signOut(auth);
  }
}
