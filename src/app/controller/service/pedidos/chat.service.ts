import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../app.config';

import { Observable, catchError, throwError } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private apiUrl = BASE_URL;

  constructor(private http: HttpClient) {
    this.socket = io(this.apiUrl);
  }
  // Unirse a una sala de chat
  joinChat(dni: string): void {
    this.socket.emit('unirse', dni);
  }

  // Enviar mensaje de cliente
  sendClientMessage(dni: string, mensaje: string): void {
    this.socket.emit('mensajeCliente', { dni, mensaje });
  }

  // Enviar mensaje de empleado
  sendEmployeeMessage(
    codigoEmpleado: string,
    mensaje: string,
    dniCliente: string
  ): void {
    this.socket.emit('mensajeEmpleado', {
      codigoEmpleado,
      mensaje,
      dniCliente,
    });
  }

  // Recibir mensaje de cliente
  onClientMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('mensajeCliente', (data) => {
        observer.next(data);
      });
    });
  }

  // Recibir mensaje de empleado
  onEmployeeMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('mensajeEmpleado', (data) => {
        observer.next(data);
      });
    });
  }

  // Obtener todos los mensajes de un cliente
  getMessages(dni: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/chats/getMessages/${dni}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener los mensajes de dni :',dni, error);
        return throwError('Error al obtener los mensajes del cliente');
      })
    );
  }

  // Obtener todos los chats
  getAllChats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chats`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener los mensajes:', error);
        return throwError('Error al obtener los mensajes del cliente');
      })
    );
  }

  //cerrar chats
  closeChat(dni: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/chats/closeChat/${dni}`, {});
  }
}
