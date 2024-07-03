import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ClienteConMensajes, Empleado } from '../../../../model/interface/chats';
import { GestorChatsService } from '../../../../controller/service/gestorChats/gestorChats.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-conversaciones',
  standalone: true,
  imports: [
    CommonModule,RouterOutlet
  ],
  templateUrl: './Conversaciones.component.html',
  styleUrl: './Conversaciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ConversacionesComponent {
  empleados: Empleado[] = [];
  selectedEmpleado?: Empleado;
  historialClientes: ClienteConMensajes[] = [];
  selectedCliente?: ClienteConMensajes;
  
  private gestorChatsService = inject (GestorChatsService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cargarEmpleados();
  }
  
  cargarEmpleados(): void {
    this.gestorChatsService.listarEmpleadosQueRespondieron().subscribe(empleados => {
      this.empleados = empleados;
      this.cdr.markForCheck();
    });
  }

  seleccionarEmpleado(empleado: Empleado): void {
    this.selectedEmpleado = empleado;
    this.gestorChatsService.listarHistorialPorEmpleado(empleado.EmpleadoCodigo).subscribe(historialClientes => {
      this.historialClientes = historialClientes;
      this.selectedCliente = undefined; 
      this.cdr.markForCheck();
      
    });
  }

  seleccionarCliente(cliente: ClienteConMensajes): void {
    this.selectedCliente = cliente;
  }
}
