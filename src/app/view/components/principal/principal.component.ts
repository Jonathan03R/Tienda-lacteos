import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { ProductosService } from '../../../controller/service/productos.service';
import { FlooterComponent } from '../../shared/Flooter/Flooter.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavBarComponent,
    FlooterComponent
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export default class PrincipalComponent implements OnInit {

  ngOnInit(): void {
  } 



}
