import { Component, OnInit, OnChanges } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messages: any[] = [];
  startTime: Date = new Date();
  constructor(public socket: Socket) { }

  ngOnInit() {
    this.socket.on('radbot_chat', (chat) => {
      this.messages.push(chat);
    });
  }

  orderedMessages = (messageList) => {
    return this.messages.sort((a, b) => b.tmi_sent_ts - a.tmi_sent_ts);
  }
}
