import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faUser, faCartShopping, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { CarritoServiceService } from '../../../controller/service/carrito/CarritoService.service';
import { Productos } from '../../../model/interface/Productos';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {

  _carritoService = inject(CarritoServiceService);

  //ICONOS 
  faUser = faUser;
  faCartShopping = faCartShopping;
  faHeart = faHeart;
  faTrash = faTrash;
 
  productosCarrito: Productos[] = [];
  dataUser: any;
  spinner: boolean = true;

  ngOnInit(): void {
    this._carritoService.obtenerCarrito().subscribe(carrito => {
      this.productosCarrito = carrito;
    })
  }


  // public menuItems = routes
  //   .map(routes => routes.children ?? [])
  //   .flat()
  //   .filter(routes => routes && routes.path)
  //   .filter(routes => !routes.path?.includes('**'))
  public menuItems = routes
    .filter(route => route.path === 'dashboard')  // Encuentra la ruta 'dashboard'
    .flatMap(route => route.children ?? [])  // Extrae las rutas hijas
    .filter(route => route && route.path)  // Filtra las rutas válidas
    .filter(route => !route.path?.includes('**'))  // Elimina las rutas comodín
    .map(route => ({
        path: route.path,
        title: route.title
    }));

  private _router = inject(Router);

  redirectToPantallaCarga() {
    this._router.navigate(['/cargando']);
  }


  calcularTotal(): string  {
    let total = 0;
    for (const producto of this.productosCarrito) {
      total += producto.ProductoPrecio * producto.quantity!;
    }
    return total.toFixed(2);;
  }

}
