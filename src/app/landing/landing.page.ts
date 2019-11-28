import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HandlerService} from '../services/handler.service';
import {NavController, PopoverController} from '@ionic/angular';
import {StoreSelectionComponent} from '../components/store-selection/store-selection.component';
import {Device} from '@ionic-native/device/ngx';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

  loginForm: FormGroup;

  isSelected = false;
  selectedStore: any;

  constructor(public formBuild: FormBuilder, public pop: PopoverController, public device: Device, public navCtrl: NavController, public handler: HandlerService) {

    this.init();

    this.loginForm = this.formBuild.group({
      ip: ['192.168.1.27', Validators.required],
      port: ['8400', Validators.required],
      store_id: ['', Validators.required],
      user_name: ['55', Validators.required],
      password: ['[810C679D]', Validators.required]
    });

  }


  // AUTOLOGIN --------------------------------------------------

  init(){
    let temp: any;
    this.handler.autoLogin()
      .then( resolve => {
        if (resolve != null){
          temp = resolve;
          this.loginForm.value.ip = temp.ip;
          this.loginForm.value.port = temp.port;
          this.handler.serverLink = "http://" + this.loginForm.value.ip + ":" + this.loginForm.value.port;
          this.loginForm.value.store_id = temp.store_id;
          this.loginForm.value.user_name = temp.user_name;
          this.loginForm.value.password = temp.password;

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
        }else{
          console.log("Server is not connected");
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

}
