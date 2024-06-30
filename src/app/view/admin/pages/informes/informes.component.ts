import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class InformesComponent { 


}





