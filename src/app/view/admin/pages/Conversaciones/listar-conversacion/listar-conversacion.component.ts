import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ClienteConMensajes, Empleado } from '../../../../../model/interface/chats';
import { GestorChatsService } from '../../../../../controller/service/gestorChats/gestorChats.service';

@Component({
  selector: 'app-listar-conversacion',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './listar-conversacion.component.html',
  styleUrl: './listar-conversacion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListarConversacionComponent { 
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

