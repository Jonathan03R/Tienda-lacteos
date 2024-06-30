import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../../controller/service/pedidos/chat.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { EmpleadosService } from '../../../../controller/service/autenticacionController/empleados.service';
import { Empleados } from '../../../../model/interface/empleados';

interface ClientChat {
  clientId: string;
  clientCode: string;
  messages: { text: string; user: boolean }[];
}

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ConsultasComponent implements OnInit {
  clientChats: ClientChat[] = [];
  selectedChat: ClientChat | null = null;
  workerInput: string = '';
  employeeId: string = '';
  isVisible: boolean = true;
  empleado: Empleados[] =[];

  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  
  constructor(
    private chatService: ChatService,
    private changeDetectorRef: ChangeDetectorRef,
    private empleadoService: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.listarEmpleadoActual();
    this.loadClientChats();
    this.chatService.onClientMessage().subscribe((message: any) => {
      // console.log('Mensaje recibido:', message);
      const chat = this.clientChats.find(chat => chat.clientId === message.dni);

      if (chat) {
        chat.messages.push({ text: message.mensaje, user: true });
        // console.log('Mensaje agregado a chat existente:', chat);
      } else {
        this.clientChats.push({
          clientId: message.mensajesClienteDni,
          clientCode: message.mensajesClienteDni,
          messages: [{ text: message.mensaje, user: true }]
        });
      }
      this.changeDetectorRef.markForCheck();
      this.scrollToBottom();
    });

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  listarEmpleadoActual(){
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleado = data;
        console.log('Empleados data:', data);
        if (this.empleado.length > 0) {
          this.employeeId = this.empleado[0].EmpleadoCodigo.toString(); 
          console.log('Empleado actual:', this.empleado[0]);
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de empleados', error);
      }
    });
  }

  loadClientChats() {
    this.chatService.getAllChats().subscribe((chats: any) => {
    //  console.log('Chats recibidos loadClientChats:', chats);
      this.clientChats = chats.map((chat: any) => ({
        clientId: chat.mensajesClienteDni,
        clientCode: chat.mensajesClienteDni,
        messages: []
      }));
      this.changeDetectorRef.markForCheck();
    });
  }

  selectChat(chat: ClientChat) {
    this.chatService.getMessages(chat.clientId).subscribe((messages: any) => {
      // console.log('Mensajes recibidos para el chat:', messages);
      chat.messages = messages.map((msg: any) => ({
        text: msg.mensajesTexto,
        user: msg.user
      }));
      this.selectedChat = chat;
      this.changeDetectorRef.markForCheck();
      this.scrollToBottom();
    });
  }

  sendMessage() {
    if (this.workerInput.trim() && this.selectedChat) {
      this.chatService.sendEmployeeMessage(this.employeeId, this.workerInput, this.selectedChat.clientId);
      this.selectedChat.messages.push({ text: this.workerInput, user: false });
      this.workerInput = '';
      this.changeDetectorRef.markForCheck();
      this.scrollToBottom();
    }
  }

  closeChat() {
    // this.isVisible = false;
    this.selectedChat = null;
  }

  closeChatCliente() {
    if (this.selectedChat) {
      this.chatService.closeChat(this.selectedChat.clientId).subscribe(() => {
        this.selectedChat = null;
        this.loadClientChats(); 
        this.changeDetectorRef.markForCheck();
      });
    }
  }


  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error al hacer scroll:', err);
    }
  }

  // Iconos
  faXmark = faXmark;
}