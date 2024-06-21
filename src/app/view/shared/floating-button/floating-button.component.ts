import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MiniChatComponent } from './mini-chat/mini-chat.component';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [CommonModule, MiniChatComponent],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingButtonComponent {
  isChatVisible: boolean = false;

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }
}
