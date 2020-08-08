import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
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
      this.cardDetails.stats.push(
        AvailableCardOptions[
          Math.floor(Math.random() * AvailableCardOptions.length)
        ]
      );
      setTimeout(() => {
        this.cardDetails = null;
      }, 10000);
    });
  }
}
