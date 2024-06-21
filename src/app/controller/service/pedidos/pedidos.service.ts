import { Injectable, inject } from '@angular/core';
import { PedidoRequest } from '../../../model/interface/pedidos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../../app.config';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private http = inject(HttpClient);
  constructor() { }

  crearPedido(pedido: PedidoRequest): Observable<any> {
    return this.http.post(`${BASE_URL}/pedido/crearPedido`, pedido);
  }

}
