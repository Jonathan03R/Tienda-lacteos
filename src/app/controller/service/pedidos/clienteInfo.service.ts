import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import { Observable, catchError, throwError } from 'rxjs';
import { ClienteInfo } from '../../../model/interface/cliente-info';

@Injectable({
  providedIn: 'root',
})
export class ClienteInfoService {
  private http = inject(HttpClient);
  constructor() {}

  buscarClienteInfo(cliente: ClienteInfo): Observable<any> {
    console.log('Enviando datos al servidor:', cliente);
    return this.http.post(`${BASE_URL}/clientes/infoCliente`, cliente).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Error('Error en la solicitud'));
      })
    );
  }
}
