import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>consultas works!</p>`,
  styleUrl: './consultas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ConsultasComponent { }
