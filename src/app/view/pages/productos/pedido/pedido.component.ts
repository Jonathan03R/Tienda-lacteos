import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PedidoComponent { }
