import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MostrarClientes } from '../../../../model/interface/cliente-info';
import { ClienteInfoService } from '../../../../controller/service/pedidos/clienteInfo.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClientesComponent {

  public clientes: MostrarClientes[] = [];
  public selectedCliente: MostrarClientes | null = null;
  private originalIndex: number | null = null;


  private clienteInfoService = inject (ClienteInfoService);
  cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
   
    this.listarClientes();
  }

  listarClientes() {
    this.clienteInfoService.mostrarClientes().subscribe(
      (data) => {
        this.clientes = data;
        console.log(this.clientes);
        this.cdr.markForCheck(); 
      },
      (error) => {
        console.error('Error al cargar los clientes:', error);
        this.cdr.markForCheck(); 
      }
    );
  }

  seleccionarCliente(cliente: MostrarClientes) {
    this.originalIndex = this.clientes.indexOf(cliente);
    this.clientes = this.clientes.filter(c => c !== cliente);
    this.clientes.unshift(cliente);
    this.selectedCliente = cliente;
    
    this.scrollToTop();
    this.cdr.markForCheck();
  }

  deseleccionarCliente() {
    if (this.selectedCliente && this.originalIndex !== null) {
      this.clientes = this.clientes.filter(c => c !== this.selectedCliente);
      this.clientes.splice(this.originalIndex, 0, this.selectedCliente);
    }
    this.selectedCliente = null;
    this.originalIndex = null;
    this.cdr.markForCheck();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
