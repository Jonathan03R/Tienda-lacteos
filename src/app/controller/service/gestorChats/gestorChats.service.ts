import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteConEmpleado, ClienteConMensajes, Empleado } from '../../../model/interface/chats';

@Injectable({
  providedIn: 'root'
})
export class GestorChatsService {

  private http = inject(HttpClient)

  constructor() { }
  listarEmpleadosQueRespondieron(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${BASE_URL}/chats/empleados-respondieron-mensajes`);
  }

  listarHistorialPorEmpleado(codigoEmpleado: number): Observable<ClienteConMensajes[]> {
    return this.http.post<ClienteConMensajes[]>(`${BASE_URL}/chats/clientes-chats`, { codigoEmpleado });
  }

  buscarConversacionesPorDNI(dni: string): Observable<ClienteConEmpleado> {
    return this.http.post<ClienteConEmpleado>(`${BASE_URL}/chats/buscar-conversaciones`, { dni });
  }
}
