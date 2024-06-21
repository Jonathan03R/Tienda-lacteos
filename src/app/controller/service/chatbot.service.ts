import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private socket: Socket;
  constructor() {
    this.socket = io(BASE_URL, {
      withCredentials: true,
    });
  }

  register(role: string): void {
    this.socket.emit('register', role);
  }
  // Método para enviar un mensaje al chatbot
  sendMessage(message: string): void {
    this.socket.emit('sendMessage', message);
  }

  // Método para recibir mensajes del chatbot
  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (data) => {
        observer.next(data);
      });
    });
  }

  // Método para recibir mensajes de clientes (para los trabajadores)
  receiveClientMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('clientMessage', (data) => {
        observer.next(data);
      });
    });
  }

  sendWorkerMessage(clientId: string, message: string): void {
    this.socket.emit('sendWorkerMessage', { clientId, message });
  }

  // Método para conectarse al chatbot
  connect(): void {
    this.socket.connect();
  }

  // Método para desconectarse del chatbot
  disconnect(): void {
    this.socket.disconnect();
  }
}
