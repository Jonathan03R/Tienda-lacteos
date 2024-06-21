import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { HistorialinventarioService } from '../../../../controller/service/inventario/historialinventario.service';
import { InventoryHistory } from '../../../../model/interface/inventario';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Historial.component.html',
  styleUrl: './Historial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HistorialComponent implements OnInit{ 

  private historialInventarioService =  inject(HistorialinventarioService);


  historial: InventoryHistory[] = [];

  historialPedidos = [
    { id: 'P001', fecha: '2023-05-01', cliente: 'Juan Pérez', total: 100.00, estado: 'Completado' },
    // más datos de ejemplo
  ];
  


  constructor() { 
    
  }
  
  ngOnInit(): void {

    this.historialInventarioService.actualizarHistorial();
    this.historial = this.historialInventarioService.getHistorial();
  }

  trackByFnPedidos(index: number, item: any): number {
    return item.id;
  }

  Historial(){
    this.historialInventarioService.actualizarHistorial();
  }

}
