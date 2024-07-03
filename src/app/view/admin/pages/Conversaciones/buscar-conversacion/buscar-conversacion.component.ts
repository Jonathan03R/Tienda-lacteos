import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { GestorChatsService } from '../../../../../controller/service/gestorChats/gestorChats.service';
import { ClienteConEmpleado, ClienteConMensajes } from '../../../../../model/interface/chats';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar-conversacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-conversacion.component.html',
  styleUrl: './buscar-conversacion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BuscarConversacionComponent {
  
  private gestorChatsService = inject(GestorChatsService);

  searchType: 'dni' | 'codigoEmpleado' = 'dni';
  searchValue: string = '';
  clienteConEmpleado?: ClienteConEmpleado;
  historialClientes: ClienteConMensajes[] = [];
  crd = inject (ChangeDetectorRef);

  buscarConversacion(): void {
    if (this.searchType === 'dni' && this.searchValue) {
      this.gestorChatsService.buscarConversacionesPorDNI(this.searchValue).subscribe(data => {
        this.clienteConEmpleado = data;
        this.historialClientes = [];
        this.crd.markForCheck();
      });
    } else if (this.searchType === 'codigoEmpleado' && this.searchValue) {
      const codigoEmpleado = parseInt(this.searchValue, 10);
      this.gestorChatsService.listarHistorialPorEmpleado(codigoEmpleado).subscribe(data => {
        this.historialClientes = data;
        this.clienteConEmpleado = undefined;
        this.crd.markForCheck();
      });
    }
  }
  
}
