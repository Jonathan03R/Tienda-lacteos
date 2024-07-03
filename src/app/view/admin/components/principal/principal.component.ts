import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../../app.routes';
import { AuthService } from '../../../../controller/service/autenticacionController/auth.service';
import { InventarioService } from '../../../../controller/service/inventario/inventario.service';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HistorialinventarioService } from '../../../../controller/service/inventario/historialinventario.service';
import { Empleados } from '../../../../model/interface/empleados';
import { EmpleadosService } from '../../../../controller/service/autenticacionController/empleados.service';
import { error } from 'jquery';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrincipalComponent implements OnInit {
  _inventarioService = inject(InventarioService);
  _router = inject (Router);
  authService = inject(AuthService);
  private empleadosService = inject(EmpleadosService);
  cdr = inject(ChangeDetectorRef);

  currentUser: any;
  cargo: string | null = null;
  empleado: Empleados | null = null;
  isConversacionesExpanded = false;

  public menuItems = routes
    .filter((route) => route.path === 'Empresa')
    .flatMap((route) => route.children ?? [])
    .filter((route) => route && route.path)
    .filter((route) => !route.path?.includes('**'))
    .filter((route) => !route.path?.includes('trabajadores'))
    .filter((route) => !route.path?.includes('informes'))
    .filter((route) => !route.path?.includes('conversaciones-gestor'))
    .map((route) => ({
      path: route.path,
      title: route.title,
    }));

  public menuItemsAdministrador = routes
    .filter((route) => route.path === 'Empresa')
    .flatMap((route) => route.children ?? [])
    .filter((route) => route && route.path)
    .filter((route) => !route.path?.includes('**'))
    .map((route) => ({
      path: route.path,
      title: route.title,
    }));


    public subMenuConversaciones = (
      routes
        .find(route => route.path === 'Empresa')?.children
        ?.find(child => child.path === 'conversaciones-gestor')?.children
        ?.filter(route => route && route.path && !route.path.includes('**'))
        ?.map(route => ({
          path: route.path,
          title: route.title,
        })) 
    ) || [];

  public iconItems = [
    'lni lni-home',
    'lni lni-dropbox',
    'lni lni-network',
    'lni lni-bubble',
    'lni lni-user',
    'lni lni-pencil-alt',
    'lni lni-users',
    'lni lni-stats-down',
    'lni lni-comments'
  ];

  public combinedMenuItems: any[] = [];

  ngOnInit(): void {
    console.log(this.subMenuConversaciones);
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
      console.log(
        'Usuario actual desde la ventana principal:',
        this.currentUser
      );
    });
    this.ObtenerEmpleadoActual();
  }

  ObtenerEmpleadoActual(){
    this.empleadosService.getEmpleados().subscribe(empleados => {
      this.empleado = empleados.find(e => e.Empleadoemail === this.currentUser?.email) || null;
      this.cargo = this.empleado?.Cargo || null;
      this.actualizarMenu();
      // this.cdr.markForCheck();
    });
  }


  cerrarSesion(){
    this.authService.cerrarSesion().then(() => {
      this._router.navigate(['/login']);
    }).catch(error =>{
      console.error('Error al cerrar sesión:', error);
    });
  }

  actualizarMenu() {
    if (this.cargo === 'Gerente') {
      this.combinedMenuItems = this.menuItemsAdministrador.map(
        (item, index) => ({
          ...item,
          icon: this.iconItems[index] ?? 'lni lni-default',
          
        })
      );
    } else {
      this.combinedMenuItems = this.menuItems.map((item, index) => ({
        ...item,
        icon: this.iconItems[index] ?? 'lni lni-default',
      }));
    }
  }


  ngAfterViewInit() {
    const hamBurger = document.querySelector('.toggle-btn') as HTMLElement;

    hamBurger.addEventListener('click', function () {
      document.querySelector('#sidebar')?.classList.toggle('expand');
    });
  }


  toggleConversaciones() {
    this.isConversacionesExpanded = !this.isConversacionesExpanded;
  }
}
