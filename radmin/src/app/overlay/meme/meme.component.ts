import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, left: -100 }),
        animate('1s ease-out', style({ opacity: 1, left: 10 })),
      ]),
      transition(':leave', [
        style({ opacity: 1, left: 10 }),
        animate('1s ease-in', style({ opacity: 0, left: -100 })),
      ]),
    ]),
  ],
})
export class MemeComponent implements OnInit {
  activeMemeUrl: string = null;
  memeDetails: any = null;

  constructor(public socket: Socket) { }

  ngOnInit(): void {
    this.socket.on('show_meme', (memeDetails) => {
      // this.activeMeme = 'https://media.giphy.com/media/srb6bXZHbgDsc/giphy.gif';
      this.memeDetails = memeDetails;
      this.activeMemeUrl = `https://api.memegen.link/images/${memeDetails.meme}/${memeDetails.topText}/${memeDetails.bottomText}.png`;
      setTimeout(() => {
        this.activeMemeUrl = null;
        this.memeDetails = null;
      }, 12000);
    });
  }

}
