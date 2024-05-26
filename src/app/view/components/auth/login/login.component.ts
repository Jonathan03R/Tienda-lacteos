import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../../../controller/service/autenticacionController/auth.service';
import { UserLogin, UserLoginForm } from '../../../../model/interface/user';
import { FirebaseErrorService } from '../../../../controller/service/autenticacionController/firebase-error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private _router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private firebaseErrorService = inject(FirebaseErrorService)

  iniciarSesionConGoogle() {
    this.authService.iniciarSesionConGoogle().catch(error => {
      console.error('Error al iniciar sesión con Google', error);
    });
  }

  async login() {
    console.log('Estado del formulario login', this.formLogin.value);
    if (this.formLogin.invalid){
      console.log('El fomulario es invalid');
      return;
    }

    const user: UserLogin = {
      Usuariocorreo_electronico: this.formLogin.value.Usuariocorreo_electronico!,
      Usuariocontrasena: this.formLogin.value.Usuariocontrasena!,
    }; 
    try{
      await this.authService.logearse(user);
      console.log(this.formLogin.value);
      console.log("logeo exitoso")
      this._router.navigateByUrl('/dashboard')
    } catch(error){
      console.log(error);
      alert( this.firebaseErrorService.handleFirebaseError(error));
    }

  }

  formLogin: FormGroup<UserLoginForm> = this.formBuilder.group({
    Usuariocorreo_electronico: this.formBuilder.control('',{
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    Usuariocontrasena: this.formBuilder.control('', {
      validators:[Validators.required],
      nonNullable: true,
    })
  })

  // Iconos 

  faGoogle = faGoogle;
  
}
