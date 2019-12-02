import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HandlerService} from '../services/handler.service';
import {ModalController, NavController, PopoverController} from '@ionic/angular';
import {StoreSelectionComponent} from '../components/store-selection/store-selection.component';
import {Device} from '@ionic-native/device/ngx';
import {ScanQRComponent} from '../components/scan-qr/scan-qr.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage {

  loginForm: FormGroup;

  isSelected = false;
  selectedStore: any;

  constructor(public formBuild: FormBuilder, public pop: PopoverController, public device: Device, public navCtrl: NavController, public modCtrl: ModalController, public handler: HandlerService) {

    this.getSavedCredentials();

    this.loginForm = this.formBuild.group({
      ip: ['', Validators.required],
      port: ['', Validators.required],
      store_id: ['', Validators.required],
      user_name: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  // AUTOLOGIN --------------------------------------------------

  getSavedCredentials(){
    let temp: any;
    this.handler.autoLogin()
      .then( resolve => {
        if (resolve != null){
          temp = resolve;
          // this.loginForm.value.ip = temp.ip;
          // this.loginForm.value.port = temp.port;
          // this.handler.serverLink = "http://" + this.loginForm.value.ip + ":" + this.loginForm.value.port;
          // this.loginForm.value.store_id = temp.store_id;
          // this.loginForm.value.user_name = temp.user_name;
          // this.loginForm.value.password = temp.password;


          this.loginForm = this.formBuild.group({
            ip: [temp.ip, Validators.required],
            port: [temp.port, Validators.required],
            store_id: [temp.store_id, Validators.required],
            user_name: [temp.user_name, Validators.required],
            password: [temp.password, Validators.required]
          });
          this.handler.serverLink = "http://" + this.loginForm.value.ip + ":" + this.loginForm.value.port;

          this.submit();

        }
      });
  }
  // --------------------------------------------------


  // HANDLE IP AND PORT INPUT --------------------------------------------------

  fillIp(){
    if (this.handler.serverLink == undefined || this.loginForm.value.port == ''){
      this.handler.serverLink = 'http://' + this.loginForm.value.ip;
    }else{
      this.handler.serverLink = "http://" + this.loginForm.value.ip + ":" + this.loginForm.value.port;
    }
  }

  fillPort(){
    if (this.loginForm.value.ip != ''){
      this.handler.serverLink = "http://" + this.loginForm.value.ip + ":" + this.loginForm.value.port;
    }
  }

  // --------------------------------------------------


  // GET STORE LIST --------------------------------------------------

  getStores(){

    if (this.loginForm.value.ip != '' && this.loginForm.value.port != ''){
      this.handler.serverLink = "http://" + this.loginForm.value.ip + ":" + this.loginForm.value.port;
      this.handler.getListStores()
        .then( resolve => {
          if (resolve != null){
            this.presentStoreList(resolve);
          }
        });
    }
  }
  // --------------------------------------------------


  // STORE SELECTION POPOVER --------------------------------------------------

  async presentStoreList(list){
    const storeSelection = await this.pop.create({
      component: StoreSelectionComponent,
      componentProps:{
        list: list
      }
    });

    storeSelection.onDidDismiss()
      .then( data => {
        if (data.data != undefined){
          this.loginForm.value.store_id = data.data.store_id;
          this.isSelected = true;
          this.selectedStore = data.data;
        }
      });

    return await storeSelection.present();
  }
  // --------------------------------------------------


  // TEST CONNECTION --------------------------------------------------

  checkConnection(){
    this.handler.isConnected()
      .then( resolve => {
        if (resolve){
          console.log("Server is online");
          this.handler.connectionAlert(0);
        }else{
          console.log("Server is not connected");
          this.handler.connectionAlert(1);
        }
      });
  }
  // --------------------------------------------------


  // SUBMIT FORM --------------------------------------------------

  submit(){
    let body = {
      "store_id": this.loginForm.value.store_id,
      "user_name": this.loginForm.value.user_name,
      "pwd": this.loginForm.value.password
    };

    console.log(body);

    this.handler.validate(body)
      .then( resolve => {
        if (resolve){
          this.handler.saveCredentials(this.loginForm.value);
          this.grabLogin(body);
        }
      });
  }
  // --------------------------------------------------


  // LOGIN --------------------------------------------------

  grabLogin(body){
    this.handler.login(body)
      .then( resolve => {
        if (resolve){
          this.navCtrl.navigateForward('home');
        }
      });
  }
  // --------------------------------------------------


  // QR SCAN --------------------------------------------------

  async goScanQR(){
    const scan = await this.modCtrl.create({
      component: ScanQRComponent,
      cssClass: "modalSmall",
      mode: 'ios'
    });

    scan.onDidDismiss()
      .then(data => {
        console.log(data);

        if(data.data != undefined){
          this.loginForm = this.formBuild.group({
            ip: [data.data[0], Validators.required],
            port: [data.data[1], Validators.required],
            store_id: [data.data[2], Validators.required],
            user_name: [data.data[3], Validators.required],
            password: [data.data[4], Validators.required]
          });

          this.submit();
        }
      });

    return await scan.present();
  }
  // --------------------------------------------------



}
