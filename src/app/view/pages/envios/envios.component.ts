import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ClienteInfoService } from '../../../controller/service/pedidos/clienteInfo.service';
import { ClienteInfo } from '../../../model/interface/cliente-info';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  private snackBar = inject(MatSnackBar);
  // MatSnackBar
  ngOnInit(): void {}
  buscarinformacionCliente() {
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
              this.snackBar.open('Cliente no encontrado', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center'
              });
          
              this.cdr.markForCheck();
            }
          },
          (error) => {
            console.error('Error al obtener la información del cliente', error);
            this.snackBar.open('Ocurrió un error al obtener la información del cliente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center'
            });
            
            this.cdr.markForCheck();
          }
        );
    } else {
      this.snackBar.open('Por favor ingrese un DNI válido.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center'
      });
    }
  }
}
