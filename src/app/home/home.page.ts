import { Component } from '@angular/core';
import {HandlerService} from '../services/handler.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public handler: HandlerService) {
    console.log(this.handler.serverLink + '/assistant/storeimagechecker.png');
  }

}
