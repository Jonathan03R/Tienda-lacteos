import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NoticiasComponent { }
