import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ClienteInfoService } from '../../../controller/service/pedidos/clienteInfo.service';
import { ClienteInfo } from '../../../model/interface/cliente-info';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-envios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './envios.component.html',
  styleUrl: './envios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EnviosComponent {
  clienteInforService = inject(ClienteInfoService);

  dni: string = '';
  cdr = inject(ChangeDetectorRef);
  clienteInfo: ClienteInfo | null = null;

  ngOnInit(): void {

  }
  buscarinformacionCliente(){
    if (this.dni) {
      console.log('Enviando solicitud con DNI:', this.dni);
      this.clienteInforService
        .buscarClienteInfo({ ClienteDni: this.dni } as ClienteInfo)
        .subscribe(
          (data) => {
            console.log('Datos recibidos:', data);
            if (data) {
              this.clienteInfo = data;
              this.cdr.markForCheck(); 
            } else {
              this.clienteInfo = null;
              alert('Cliente no encontrado');
              this.cdr.markForCheck(); 
            }
          },
          (error) => {
            console.error('Error al obtener la información del cliente', error);
            alert('Ocurrió un error al obtener la información del cliente');
            this.cdr.markForCheck();
          }
        );
    } else {
      alert('Por favor ingrese un DNI válido');
    }
  }
}
