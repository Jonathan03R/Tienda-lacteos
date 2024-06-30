import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../controller/service/autenticacionController/auth.service';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../controller/service/autenticacionController/empleados.service';
import { Empleados } from '../../../model/interface/empleados';

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
export default class PerfilComponent implements OnInit { 
  authservice = inject(AuthService);
  private _router = inject(Router);

  private empleadosService = inject(EmpleadosService);
  empleados: Empleados[] = [];
  currentUser: any;
  photoURL: string | null = null;

  ngOnInit() {
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        console.log('Empleados data:', data);
      },
      error: (error) => {
        console.error('Error al obtener la lista de empleados', error);
      }
    });
    this.obteerUsuarioActual();
  }

  obteerUsuarioActual() {
    this.authservice.user$.subscribe((user) => {
      this.currentUser = user;
      console.log('Usuario actual desde la ventana principal:',this.currentUser);
      this.photoURL = this.currentUser.photoURL;
   
    });
  }

  cerrarSesion(){
    this.authservice.cerrarSesion().then(() => {
      this._router.navigate(['/login']);
    }).catch(error =>{
      console.error('Error al cerrar sesión:', error);
    });
  }

}
