import { Component } from '@angular/core';
import {HandlerService} from '../services/handler.service';
import {ModalController} from '@ionic/angular';
import {InfoComponent} from '../components/info/info.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  host: { '(document:keypress)': 'handleKeyboardEvent($event)'}
})
export class HomePage {

  imgIp: string;
  imgName: string;
  isModalOpen = false;

  constructor(public modCtrl: ModalController,public handler: HandlerService) {

    this.imgName = '';
    this.imgName = "/assistant/storeimagechecker.png";

    this.getIp();
  }

  handleKeyboardEvent(event){

    let temp = this.handler.getKeystrokes(event);

    if (temp == 1){
      this.handler.scan()
        .then( resolve => {
          if (resolve){
            if (
              (this.handler.currentItem.iteminfo.length != 0 && this.handler.currentItem.iteminfo.descr == '') ||
              (this.handler.currentItem.loyaltycard.length != 0 && this.handler.currentItem.loyaltycard.name == '')
            ){ this.handler.noDataAlert();
            }else{
              if (!this.isModalOpen){
                this.isModalOpen = true;
                this.handler.closeOnTimer();
                this.showInfo();
              }else{
                this.handler.clearTime();
              }
            }
          }
        });
    }
  }

  getIp(){
    let temp = this.handler.serverLink.split(':');
    this.imgIp = temp[0] + ":" + temp[1];
  }

  async showInfo(){

    const info = await this.modCtrl.create({
      component: InfoComponent,
      cssClass: "modalBig",
      backdropDismiss: false
    });

    info.onDidDismiss()
      .then( () => {
        this.isModalOpen = false;
      });
    return await info.present();

  }

}
