import { Component, OnInit } from '@angular/core';
import {HandlerService} from '../../services/handler.service';
import {ModalController} from '@ionic/angular';

import {Decimal} from 'decimal.js';

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

  getDiff(){
    return new Decimal(this.handler.currentItem.iteminfo.price).sub(this.handler.currentItem.iteminfo.final_price).toFixed(2);
  }

}
