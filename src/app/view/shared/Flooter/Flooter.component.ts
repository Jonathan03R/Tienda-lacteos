import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-flooter',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Flooter.component.html',
  styleUrl: './Flooter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlooterComponent { }
