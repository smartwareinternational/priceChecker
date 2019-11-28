import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HandlerService} from '../services/handler.service';
import {PopoverController} from '@ionic/angular';
import {StoreSelectionComponent} from '../components/store-selection/store-selection.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

  loginForm: FormGroup;

  isSelected = false;
  selectedStore: any;

  constructor(public formBuild: FormBuilder, public pop: PopoverController, public handler: HandlerService) {

    this.loginForm = this.formBuild.group({
      ip: ['192.168.1.27', Validators.required],
      port: ['8400', Validators.required],
      store_id: ['', Validators.required],
      user_name: ['55', Validators.required],
      password: ['[810C679D]', Validators.required]
    });

  }

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

  checkIp(){

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
          this.grabLogin();
        }
      });
  }

  grabLogin(){
    
  }

}
