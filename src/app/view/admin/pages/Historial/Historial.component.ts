import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HistorialinventarioService } from '../../../../controller/service/inventario/historialinventario.service';
import { InventoryHistory } from '../../../../model/interface/inventario';
import { PedidosService } from '../../../../controller/service/pedidos/pedidos.service';
import { HistorialPedido } from '../../../../model/interface/pedidos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    CommonModule,FormsModule
  ],
  templateUrl: './Historial.component.html',
  styleUrl: './Historial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HistorialComponent implements OnInit{ 

  private historialInventarioService =  inject(HistorialinventarioService);
  private pedidosService= inject (PedidosService);
  cdr = inject(ChangeDetectorRef);

  historial: InventoryHistory[] = [];
  pedidos: HistorialPedido[] = [];

  pedidosPendientes: HistorialPedido[] = [];
  pedidosEntregados: HistorialPedido[] = [];
  pedidosCancelados: HistorialPedido[] = [];

  pedidosFiltrados: HistorialPedido[] = [];

  selectedPedido: HistorialPedido | null = null;
  nuevoEstado: string = 'Pendiente';
  showModal = false;
  mostrarFiltros= true
  constructor() { 
    
  }

  
  
  ngOnInit(): void {

    this.historialInventarioService.actualizarHistorial();
    this.historial = this.historialInventarioService.getHistorial();
    this.HistorialPedido();

  }

  activarFiltros(){
    this.mostrarFiltros = !this.mostrarFiltros;
    // if(this.mostrarBuscarCliente){
    //   this.mostrarBuscarCliente= false;
    // }else {
    //   this.mostrarBuscarCliente= true
    // }
    
  }

 

  Historial(){
    this.historialInventarioService.actualizarHistorial();
    this.activarFiltros()
  }


  HistorialPedido() {
    this.pedidosService.listarHistoriaPedido().subscribe((data: HistorialPedido[]) =>{
      this.pedidos = data;
      this.filtrarPedidosPorEstado();
      this.pedidosFiltrados = this.pedidosPendientes;
      this.cdr.markForCheck();
    });
  }

  filtrarPedidosPorEstado(): void {
    this.pedidosPendientes = this.pedidos.filter(pedido => pedido.PedidoEstado === 'Pendiente');
    this.pedidosEntregados = this.pedidos.filter(pedido => pedido.PedidoEstado === 'Entregado');
    this.pedidosCancelados = this.pedidos.filter(pedido => pedido.PedidoEstado === 'Cancelado');
  }

  onEstadoChange(estado: string): void {
    if (estado === 'Pendientes') {
      this.pedidosFiltrados = this.pedidosPendientes;
    } else if (estado === 'Entregados') {
      this.pedidosFiltrados = this.pedidosEntregados;
    } else if (estado === 'Cancelados') {
      this.pedidosFiltrados = this.pedidosCancelados;
    }
    this.cdr.markForCheck();
  }

  selectPedido(pedido: HistorialPedido): void {
    this.selectedPedido = pedido;
    this.nuevoEstado = pedido.PedidoEstado;

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPedido = null;
  }


  async updatePedidoEstado(): Promise<void> {
    if (this.selectedPedido) {
      try {
        await this.pedidosService.actualizarPedido(this.selectedPedido.PedidoCodigo, this.nuevoEstado).toPromise();
        this.selectedPedido!.PedidoEstado = this.nuevoEstado;
        this.filtrarPedidosPorEstado();
        this.onEstadoChange(this.nuevoEstado); // Pasamos el valor del estado directamente
        this.closeModal();
        this.HistorialPedido(); // Actualizar el listado de pedidos
        this.cdr.markForCheck();
      } catch (error) {
        console.error('Error updating pedido:', error);
      }
    }
  }

}
