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
import { ChatbotService } from '../../../../controller/service/chatbot.service';
import { io, Socket } from 'socket.io-client';

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
  messages: { text: string; user: boolean }[] = [];
  presetMessages: string[] = ['Hola', 'Necesito ayuda', 'Gracias'];

  @ViewChild('messageContainer') messageContainer!: ElementRef;
  
  constructor(
    private chatbotService: ChatbotService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.chatbotService.connect();
    this.chatbotService.register('client');
    this.chatbotService.receiveMessages().subscribe((data: any) => {
      this.messages.push({ text: data.reply, user: false });
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();
    });
  }

  closeChat() {
    this.isVisible = false;
  }

  sendPresetMessage(message: string): void {
    this.messages.push({ text: message, user: true });
    this.chatbotService.sendMessage(message);
    this.changeDetectorRef.detectChanges();
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userInput.trim() !== '') {
      const messageToSend = this.userInput;
      this.userInput = '';
      this.messages.push({ text: messageToSend, user: true });
      this.chatbotService.sendMessage(messageToSend);
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }, 0);
    } catch(err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  //iconos

  faPaperPlane = faPaperPlane;
  faXmark = faXmark;
}
