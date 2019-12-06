import { Component, OnInit } from '@angular/core';
import {HandlerService} from '../../services/handler.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  constructor(public modCtrl: ModalController, public handler: HandlerService) {
    console.log(this.handler.currentItem);
  }

  ngOnInit() {
  }

}
