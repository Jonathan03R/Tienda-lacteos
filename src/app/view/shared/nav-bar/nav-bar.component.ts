import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faUser, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'


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
export class NavBarComponent {
  //ICONOS 
  faUser = faUser;
  faCartShopping = faCartShopping;
  faHeart = faHeart;


  dataUser: any;
  spinner: boolean = true;
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
