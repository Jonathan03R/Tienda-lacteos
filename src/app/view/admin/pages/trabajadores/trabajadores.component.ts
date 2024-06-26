import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './trabajadores.component.html',
  styleUrl: './trabajadores.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrabajadoresComponent { }
