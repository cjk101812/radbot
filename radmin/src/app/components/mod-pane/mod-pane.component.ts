import { Component, OnInit, OnChanges } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mod-pane',
  templateUrl: './mod-pane.component.html',
  styleUrls: ['./mod-pane.component.scss']
})
export class ModPaneComponent implements OnInit {
  messages: any[] = [];
  startTime: Date = new Date();
  botMessage: string = null;
  constructor(public socket: Socket) { }

  ngOnInit() {
  }

  sendShoutout = (userName) => {
    this.socket.emit('radbot_shoutout', userName);
  }

  sendMessageAsBot = (message) => {
    console.log(message);
    this.socket.emit('radbot_announcement', message);
  }
}
