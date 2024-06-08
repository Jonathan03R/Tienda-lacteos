import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../../../controller/service/chatbot.service';

interface ClientChat {
  clientId: string;
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

  constructor(
    private chatbotService: ChatbotService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chatbotService.connect();
    this.chatbotService.register('worker');
    this.chatbotService.receiveClientMessages().subscribe((data: any) => {
      console.log('Mensaje de cliente recibido:', data);
      let chat = this.clientChats.find((c) => c.clientId === data.clientId);
      console.log('clientechat', this.clientChats)
      if (!chat) {
        chat = { clientId: data.clientId, messages: [] };
        this.clientChats.push(chat);
      }
      chat.messages.push({ text: data.message, user: true });
      this.changeDetectorRef.detectChanges();
    });
  }

  selectChat(chat: ClientChat): void {
    this.selectedChat = chat;
    this.changeDetectorRef.detectChanges();
  }

  sendWorkerMessage(): void {
    if (this.workerInput.trim() && this.selectedChat) {
      const message = this.workerInput.trim();
      this.workerInput = '';
      this.selectedChat.messages.push({ text: message, user: false });
      this.chatbotService.sendWorkerMessage(
        this.selectedChat.clientId,
        message
      );
      this.changeDetectorRef.detectChanges();
    }
  }
}
