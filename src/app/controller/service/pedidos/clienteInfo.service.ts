import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import { Observable, catchError, throwError } from 'rxjs';
import { ClienteInfo, MostrarClientes } from '../../../model/interface/cliente-info';

@Injectable({
  providedIn: 'root',
})
export class ClienteInfoService {
  private http = inject(HttpClient);

  private mostrarCli: MostrarClientes[] = [];
  constructor() {}

  buscarClienteInfo(cliente: { ClienteDni: string }): Observable<any> {
    console.log('Enviando datos al servidor:', cliente);
    return this.http.post(`${BASE_URL}/clientes/infoCliente`, cliente).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Error('Error en la solicitud'));
      })
    );
  }

  mostrarClientes(): Observable<MostrarClientes[]> {
    return this.http.get<MostrarClientes[]>(`${BASE_URL}/clientes/Mostrarcliente`)
  }


  getClientes(): MostrarClientes[] {
    return this.mostrarCli;
  }

  actualizarClientes(): void {
    this.mostrarClientes().subscribe(
      (data) => {
        this.mostrarCli = data.map(mostrarCli => ({ ...mostrarCli, quantity: 1 }));
      },
      (error) => {
        console.error('Error al cargar los clientes:', error);
      }
    );
  }

  
}
