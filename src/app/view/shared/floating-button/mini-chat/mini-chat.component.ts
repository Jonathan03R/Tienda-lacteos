import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
import { ChatService } from '../../../../controller/service/pedidos/chat.service';

@Component({
  selector: 'app-mini-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './mini-chat.component.html',
  styleUrl: './mini-chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniChatComponent implements OnInit {
  @Input() isVisible: boolean = false;
  userInput: string = '';
  dniInput: string = '';
  dni: string | null = null;
  messages: { text: string; user: boolean }[] = [];
  presetMessages: string[] = ['Hola', 'Necesito ayuda', 'Gracias'];
  isTyping: boolean = false;

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  constructor(
    private chatService: ChatService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chatService.onEmployeeMessage().subscribe((message: any) => {
      this.isTyping = false;
      this.messages.push({ text: message.mensaje, user: false });
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();
    });

    this.chatService.onBotMessage().subscribe((message: any) => {
      this.isTyping = false;
      this.messages.push({ text: message.mensaje, user: false });
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();
    });

    this.chatService.onBotTyping().subscribe(() => {
      this.isTyping = true;
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();
    });

    // Simula que el empleado está escribiendo
    this.chatService.onEmployeeTyping().subscribe(() => {
      this.isTyping = true;
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();
    });
  }

  closeChat() {
    this.isVisible = false;
  }

  submitDni() {
    if (this.dniInput.trim()) {
      this.dni = this.dniInput;
      this.chatService.joinChat(this.dni);
      this.loadMessages();
    }
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, user: true });
      this.chatService.sendClientMessage(this.dni!, this.userInput);
      this.userInput = '';
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();
    }
  }

  sendPresetMessage(message: string) {
    this.messages.push({ text: message, user: true });
    this.chatService.sendClientMessage(this.dni!, message);
    this.changeDetectorRef.detectChanges();
    this.scrollToBottom();
  }

  loadMessages() {
    if (this.dni) {
      this.chatService.getMessages(this.dni).subscribe((messages: any) => {
        console.log("mensajes cargados ", messages )
        this.messages = messages.map((msg: any) => ({
          text: msg.mensajesTexto,
          user: msg.user,
        }));
        this.changeDetectorRef.detectChanges();
        this.scrollToBottom();
      });
    }
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.messageContainer.nativeElement.scrollTop =
          this.messageContainer.nativeElement.scrollHeight;
      }, 0);
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  //iconos

  faPaperPlane = faPaperPlane;
  faXmark = faXmark;
}
