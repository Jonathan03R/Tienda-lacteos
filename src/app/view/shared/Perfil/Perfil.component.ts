import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../controller/service/autenticacionController/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Perfil.component.html',
  styleUrl: './Perfil.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PerfilComponent { 
  authservice = inject(AuthService);
  private _router = inject(Router);

  cerrarSesion(){
    this.authservice.cerrarSesion().then(() => {
      this._router.navigate(['/login']);
    }).catch(error =>{
      console.error('Error al cerrar sesión:', error);
    });
  }

}
