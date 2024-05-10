import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

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
export default class PrincipalComponent { }
