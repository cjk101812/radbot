import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Howl } from 'howler';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class BattleComponent implements OnInit {
  public playerOne: any = null;
  public playerTwo: any = null;
  public winner: string = null;
  public timer = 5;
  constructor(public socket: Socket) {}

  ngOnInit(): void {
    this.listenForBattle();
  }

  listenForBattle = () => {
    this.socket.on('radbot_battle', (player) => {
      if (!this.playerOne) {
        this.playerOne = player;
        this.socket.emit('radbot_battle_queued', player);
      } else if (this.playerOne && !this.playerTwo) {
        this.playerTwo = player;
        this.socket.emit('radbot_battle_queued', player);
        setTimeout(() => {
          const winner = Math.floor(Math.random() * Math.floor(2));
          this.winner = winner === 1 ? 'playerOne' : 'playerTwo';
          const sound = new Howl({
            src: ['../../assets/sounds/champions.mp3'],
            loop: false,
            volume: 0.03,
          });
          sound.play();
          this.sendWinner(winner === 1 ? this.playerOne : this.playerTwo);
          setTimeout(() => {
            this.clearPlayers();
          }, 10000);
        }, 5000);
      } else {
        this.socket.emit('radbot_battle_progress', player);
      }
    });
  };

  sendWinner = (winner) => {
    this.socket.emit('radbot_battle_winner', winner);
  };

  clearPlayers = () => {
    this.playerOne = null;
    this.playerTwo = null;
    this.winner = null;
  };
}
