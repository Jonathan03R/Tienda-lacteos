import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { User, UserForm } from '../../../../model/interface/user';
import { AuthService } from '../../../../controller/service/autenticacionController/auth.service';
import { FirebaseErrorService } from '../../../../controller/service/autenticacionController/firebase-error.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private _router = inject(Router);
  formBuilder = inject(FormBuilder);
  private firebaseError = inject(FirebaseErrorService);


  ngOnInit() {
    this.handleGoogleRedirect();
    this.subscribeToAuthStateChanges();
  }

  iniciarSesionConGoogle() {
    this.authService.iniciarSesionConGoogle().catch(error => {
      console.error('Error al iniciar sesión con Google', error);
    });
  }
  
  private handleGoogleRedirect() {
    this.authService.handleGoogleRedirect().then(email => {
      if (email) {
        console.log('Usuario autenticado con el correo:', email);
        // Aquí puedes usar el correo electrónico como desees, por ejemplo, guardarlo en una base de datos MySQL
        // Luego puedes navegar a otra página si es necesario
        // this.router.navigate(['/otra-pagina']);
      }
    }).catch(error => {
      console.error('Error al manejar la redirección de Google', error);
    });
  }

  private subscribeToAuthStateChanges() {
    this.authService.authState$.subscribe(user => {
      if (user) {
        console.log('Cambio de estado de autenticación - Usuario autenticado con el correo:', user.email);
        // Aquí también puedes usar el correo electrónico como desees
      } else {
        console.log('Cambio de estado de autenticación - Usuario no autenticado');
      }
    });
  }



  async registrar() {
    console.log('Estado del formulario:', this.formRegister.value);
    const password = this.formRegister.value.Usuariocontrasena;
    const confirmPassword = this.formRegister.value.UsuarioRepetirContrasena;
    if (password !== confirmPassword) {
      // Las contraseñas no coinciden, muestra una alerta
      alert('Las contraseñas no coinciden');
      return;
    }
    if (this.formRegister.invalid) {
      console.log('El formulario es inválido.');
      return;
    }

    const user: User = {
      UsurioNombre: this.formRegister.value.UsuarioNombre! + this.formRegister.value.UsuarioApellido,
      Usuariocorreo_electronico: this.formRegister.value.Usuariocorreo_electronico!,
      Usuariocontrasena: this.formRegister.value.Usuariocontrasena!,
      UsuarioTelefono: this.formRegister.value.UsuarioTelefono!,
    };

    try {
      await this.authService.registrarse(user);
      console.log(this.formRegister.value);
      this._router.navigateByUrl('/dashboard');
    } catch (error) {
      console.log(error);
      alert(this.firebaseError.handleFirebaseError(error))
    }
  }

  formRegister: FormGroup<UserForm> = this.formBuilder.group({
    UsuarioNombre: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    UsuarioApellido: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    Usuariocorreo_electronico: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    Usuariocontrasena: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),

    UsuarioRepetirContrasena: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    UsuarioTelefono: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  // iconos
  faGoogle = faGoogle;
}
