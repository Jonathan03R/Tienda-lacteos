import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Inventario } from '../../../../model/interface/inventario';
import { InventarioService } from '../../../../controller/service/inventario/inventario.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InventarioComponent implements OnInit { 

  _servicioInvetario = inject(InventarioService);

  inventario: Inventario []  = [];

  ngOnInit(): void {
    this._servicioInvetario.actualizarInventario();
    this.inventario = this._servicioInvetario.obtenerInventario();
  }

}
