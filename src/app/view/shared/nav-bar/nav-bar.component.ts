import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faUser, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
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

  productosCarrito: Productos[] = [];
  dataUser: any;
  spinner: boolean = true;

  ngOnInit(): void {
    this._carritoService.obtenerCarrito().subscribe(carrito => {
      this.productosCarrito = carrito;
    })
  }


  public menuItems = routes
    .map(routes => routes.children ?? [])
    .flat()
    .filter(routes => routes && routes.path)
    .filter(routes => !routes.path?.includes('**'))


  private _router = inject(Router);

  redirectToPantallaCarga() {
    this._router.navigate(['/cargando']);
  }

}
