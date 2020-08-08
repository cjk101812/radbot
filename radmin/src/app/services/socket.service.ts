import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public playerCard: any;
  public messages: any[];

  constructor(public socket: Socket) { }

  socketPlayercardListener = () => {
    return this.socket.on('radbot_playercard', (details) => {
      return details;
    });
  }

  socketChatListener = () => {
    return this.socket.on('radbot_chat', (chat) => {
      return chat;
    });
  }

  pushChatToSocket = (user) => {
    this.socket.emit('radbot_shoutout', user);
  }
}
