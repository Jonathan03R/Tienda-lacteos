import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingButtonComponent { }
