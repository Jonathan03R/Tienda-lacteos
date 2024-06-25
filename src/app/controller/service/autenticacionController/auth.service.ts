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
import { EmpleadosService } from './empleados.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth);

  private userSubject: BehaviorSubject<any>;
  public user$: Observable<any>;

  // firestore = inject(AngularFirestore);
  router = inject(Router);
  private empleadosService = inject(EmpleadosService);

  constructor() {

    this.userSubject = new BehaviorSubject<any>(null);
    this.user$ = this.userSubject.asObservable();
    this.authState$.subscribe(user => this.userSubject.next(user));
  }

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



  //  async handleGoogleRedirect(): Promise<string | null> {
  //   try {
  //     const result = await getRedirectResult(this.auth);
  //     if (result?.user) {
  //       const email = result.user.email;
  //       if (email) {
  //         const empleado = await this.empleadosService.buscarEmpleadoInfo(email).toPromise();
  //         if (empleado) {
  //           this.empleadosService.addEmpleado(empleado);
  //         }
  //         return email;
  //       }
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error('Error handling Google redirect', error);
  //     return null;
  //   }
  // }

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

  get currentUser() {
    return this.userSubject.value;
  }
}
