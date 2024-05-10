import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css',
})
export default class FavoritosComponent { }
