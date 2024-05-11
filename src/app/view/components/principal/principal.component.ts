import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { ProductosService } from '../../../controller/service/productos.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavBarComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export default class PrincipalComponent implements OnInit {

  ngOnInit(): void {
  } 



}
