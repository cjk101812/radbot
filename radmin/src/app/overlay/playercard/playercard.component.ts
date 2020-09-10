import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { Howl } from 'howler';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import AvailableCardOptions from './available-stats';

@Component({
  selector: 'app-playercard',
  templateUrl: './playercard.component.html',
  styleUrls: ['./playercard.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, right: -100 }),
        animate('1s ease-out', style({ opacity: 1, right: 10 })),
      ]),
      transition(':leave', [
        style({ opacity: 1, right: 10 }),
        animate('1s ease-in', style({ opacity: 0, right: -100 })),
      ]),
    ]),
  ],
})
export class PlayercardComponent implements OnInit {
  public cardDetails: any = null;
  public currentColor: string = null;
  public qnaList: any[] = [];
  public activeQuestion: any;
  constructor(public socket: Socket, private toastr: ToastrService) {}

  ngOnInit() {
    this.socket.on('radbot_playercard', (user) => {
      console.log('CREATED CARD');
      this.cardDetails = user;
      this.cardDetails.stats = [];
      this.cardDetails.stats.push(
        AvailableCardOptions[
          Math.floor(Math.random() * AvailableCardOptions.length)
        ]
      );
      this.cardDetails.stats.push(
        AvailableCardOptions[
          Math.floor(Math.random() * AvailableCardOptions.length)
        ]
      );
      setTimeout(() => {
        this.cardDetails = null;
      }, 10000);
    });

    this.socket.on('color_change', (hex) => {
      this.currentColor = hex;
    });

    this.socket.on('new_qna', (question) => {
      const sound = new Howl({
        src: ['../../assets/sounds/mail.mp3'],
        loop: false,
        volume: 0.03,
      });
      sound.play();
      this.qnaList.push(question);
    });

    this.socket.on('activate_qna', (qId: number) => {
      this.activeQuestion = this.qnaList[qId];
      this.qnaList.splice(qId, 1);
    });

    this.socket.on('remove_qna', (qId) => {
      this.qnaList.splice(qId, 1);
    });
  }
}
