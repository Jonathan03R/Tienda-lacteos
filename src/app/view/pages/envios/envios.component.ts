import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-envios',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './envios.component.html',
  styleUrl: './envios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EnviosComponent { }
