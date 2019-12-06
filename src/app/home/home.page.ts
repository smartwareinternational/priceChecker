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

  imgName: string;
  isModalOpen = false;
  numberOfScans: number;

  constructor(public modCtrl: ModalController,public handler: HandlerService) {

    this.imgName = '';
    this.imgName = "/api/conf/storeimagechecker.png";
    this.numberOfScans = 0;
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
              this.numberOfScans++;
              if (!this.isModalOpen){
                this.isModalOpen = true;
                this.timout();
                this.showInfo();
              }else{
                this.timout();
              }
            }
          }
        });
    }
  }

  timout() {
    setTimeout( () => {
      this.numberOfScans--;
      if (this.numberOfScans == 0){
        this.modCtrl.dismiss();
      }
      console.log("hi mr timeout");
      console.log(this.numberOfScans);
    }, 10000);
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
