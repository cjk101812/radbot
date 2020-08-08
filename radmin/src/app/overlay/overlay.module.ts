import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { OverlayRoutingModule } from './overlay-routing.module';

import { OverlayComponent } from './overlay.component';
import { ChatComponent } from './chat/chat.component';
import { PlayercardComponent } from './playercard/playercard.component';
import { BattleComponent } from './battle/battle.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    OverlayComponent,
    ChatComponent,
    PlayercardComponent,
    BattleComponent,
  ],
  imports: [CommonModule, SocketIoModule.forRoot(config), OverlayRoutingModule],
})
export class OverlayModule {}
