import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQRComponent implements OnInit {

  QRcode: string;
  focus = true;

  constructor(public modCtrl: ModalController) {
    this.focus = true;
  }

  ngOnInit() {}

  getQR(){
    console.log(this.QRcode);
    let data = this.QRcode.substring(this.QRcode.indexOf('{'), this.QRcode.indexOf('}'));
    console.log(data);

    let splitItems = data.split(",");

    let splitData = [];
    for (let item of splitItems){
      splitData.push(item.split(":"));
    }

    let finalData = [];
    for (let item of splitData){
      let temp = item[1].replace(/\s/g, '');
      finalData.push(temp.replace(/"/g, ''));
    }
    console.log(finalData);

    this.modCtrl.dismiss(finalData);
  }

  ckeckQR(){
    if (this.QRcode[this.QRcode.length - 1] == '}'){
      this.getQR();
    }
  }

}
