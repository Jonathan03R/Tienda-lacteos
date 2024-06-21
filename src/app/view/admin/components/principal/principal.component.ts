import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../../app.routes';
import { AuthService } from '../../../../controller/service/autenticacionController/auth.service';
import { InventarioService } from '../../../../controller/service/inventario/inventario.service';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HistorialinventarioService } from '../../../../controller/service/inventario/historialinventario.service';
import { Empleados } from '../../../../model/interface/empleados';
import { EmpleadosService } from '../../../../controller/service/autenticacionController/empleados.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrincipalComponent implements OnInit {

  _inventarioService = inject(InventarioService)
  private serviceHistorial = inject(HistorialinventarioService);
  private authService = inject (AuthService);
  private empleadosService = inject (EmpleadosService);

  usuario: any;
  empleado: Empleados | null = null;

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.usuario = user;
      if (user?.email) {
        this.obtenerEmpleado(user.email);
      }
    });
  }

  obtenerEmpleado(email: string) {
    this.empleadosService.buscarEmpleadoInfo(email).subscribe(
      empleado => {
        this.empleado = empleado;
        this.empleadosService.addEmpleado(empleado);
        console.log("Empleado encontrado: ", empleado);
      },
      error => {
        console.error("Error al obtener empleado: ", error);
      }
    );
  }

  public menuItems = routes
  .filter(route => route.path === 'Empresa') 
  .flatMap(route => route.children ?? []) 
  .filter(route => route && route.path)  
  .filter(route => !route.path?.includes('**'))  
  .map(route => ({
      path: route.path,
      title: route.title
  }));


  ngAfterViewInit() {
    const hamBurger = document.querySelector(".toggle-btn") as HTMLElement;

    hamBurger.addEventListener("click", function () {
      document.querySelector("#sidebar")?.classList.toggle("expand");
    });
  }


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
