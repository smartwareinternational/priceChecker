import { Injectable } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {HttpClient} from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import {AlertController, LoadingController} from '@ionic/angular';
import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

const apikey = "5F18A40A-D21B-EEF0-3E92-8F5266AD0E50";

const httpOptions = {
  headers: ({
    "Accept": "application/json",
    // "ApiKey": apikey,
    "ApiKey": "5F18A40A-D21B-EEF0-3E92-8F5266AD0E50",
    "TraceLog": "1"
  })
};

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  version = "1.1.1";
  vDate = "09/01/2020";

  // ============================== URLS ============================== //
  url_liststores = "/api/v1/liststores/active";
  url_liststores_hello = "/api/v1/liststores/hello";
  url_posvalidate = "/api/v1/users/validate";
  url_poslogin = "/api/v1/pos/login";
  url_pricechecker = "/api/v1/status/pricechecker?barcode=";
  // ============================== URLS ============================== //

  options = {};

  serverLink: string;
  validateData: any;
  userData: any;

  keystrokes = [];
  currentItem: any;

  loginFormSetUp: FormGroup;

  constructor(public natStorage: NativeStorage, public httpClient: HttpClient, public device: Device, public alertCtrl: AlertController, public translate: TranslateService, public loadCtrl: LoadingController) {
    this.translate.setDefaultLang('el');
    console.log("Language is " + this.translate.currentLang);
  }


  // AUTOLOGIN --------------------------------------------------

  autoLogin() {

    return new Promise( resolve => {

      this.natStorage.getItem('credentials')
        .then(
          data => {
            console.log('successfully loaded data');
            console.log(data);
            resolve(data);
          },
          error => {console.error(error); resolve(null);}
        );

    });
  }
  // --------------------------------------------------


  // GET STORES --------------------------------------------------
  getListStores(){
    let url = this.serverLink + this.url_liststores;
    console.log(url);

    let temp: any;

    return new Promise( resolve => {

      this.httpClient.get(url, httpOptions).subscribe( response => {
        console.log(response);
        temp = response;
        resolve(temp.result[0].data);
      }, error => {
        console.log(error);
        this.errorAlert();
        resolve(null);
      });

    });
  }
  // --------------------------------------------------


  // TEST CONNECTION --------------------------------------------------

   isConnected(){
    let url = this.serverLink + this.url_liststores_hello;
    console.log(url);

    return new Promise( resolve => {

      this.httpClient.get(url, httpOptions).subscribe( response => {
        console.log(response);
        resolve(true);
      }, error => {
        console.log(error);
        this.errorAlert();
        resolve(false);
      });

    });

  }
  // --------------------------------------------------


  // POS VALIDATE --------------------------------------------------

  validate(body){

    let url = this.serverLink + this.url_posvalidate;

    let temp: any;

    return new Promise( resolve => {

      this.httpClient.post(url, body, httpOptions).subscribe( response => {

        console.log(response);
        temp = response;
        temp = temp.result[0].data[0];
        this.validateData = temp;

        this.options = {
          headers: ({
            "Accept": "application/json",
            "ApiKey": apikey,
            "Authorization": 'Bearer ' + temp.token,
            // "FingerPrint": this.device.uuid,
            "TraceLog": "1"
          })
        };

        resolve(true);

      }, error => {
        console.log(error);
        this.errorAlert();
        resolve(false);
      });

    });

  }
  // --------------------------------------------------


  // SAVE CREDENTIALS --------------------------------------------------

  saveCredentials(credentials){
    this.natStorage.setItem('credentials', credentials)
      .then( () => {console.log('credentials stored');},
          error => {console.log('Something went wrong. credentials could not be stored');}
      );
  }
  // --------------------------------------------------


  // LOGIN --------------------------------------------------

  login(body){

    let url = this.serverLink + this.url_poslogin;

    let loginBody = {
      store_id: body.store_id,
      devicetoken: this.validateData.token,
      user_name: body.user_name,
      device: this.device.model,
      platform: this.device.platform,
      name: this.validateData.name,
      // fingerprint: this.device.uuid
    };

    let temp: any;

    return new Promise( resolve => {

      this.httpClient.post(url, loginBody, this.options).subscribe( response => {

        console.log(response);
        temp = response;
        temp = temp.result[0].data[0];

        this.userData = temp;
        resolve(true);

      }, error => {
        console.log(error);
        this.errorAlert();
        resolve(false);
      });

    });

  }
  // --------------------------------------------------

  getKeystrokes(event){
    if (event.key == 'Enter'){
      return 1;
    }else{
      if (this.keystrokes == undefined){
        this.keystrokes = [];
        this.keystrokes.push(event.key);
      }else{
        this.keystrokes.push(event.key);
      }
      return 0;
    }
  }

  scan(){
    let barcode = '';

    for (let key of this.keystrokes){
      barcode += key;
    }
    console.log(barcode);
    // barcode = "5000112528381"; //HARDCODE ITEM
    // barcode = "9980010155802"; // HARDCODE CARD
    this.keystrokes = [];

    let url = this.serverLink + this.url_pricechecker + barcode;
    console.log(url);
    let temp: any;

    return new Promise( resolve => {

      this.httpClient.get(url, this.options).subscribe( response => {
        console.log(response);
        temp = response;
        temp = temp.result[0].data;
        this.currentItem = undefined;
        this.currentItem = temp;

        resolve(true);
      }, error => {
        console.log(error);
        this.errorAlert();
        resolve(false);
      });

    });

  }

  async noDataAlert(){
    const alert = await this.alertCtrl.create({
      message: "ΔΕΝ ΒΡΕΘΗΚΑΝ ΣΤΟΙΧΕΙΑ"
    });

    setTimeout( () => this.alertCtrl.dismiss(), 3000);

    return await alert.present();
  }

  async connectionAlert(type){
    let message = '';
    if (type == 0){
      message = "Server is online";
    }else {
      message = "Server is offline";
    }

    const alert = await this.alertCtrl.create({
      message: message
    });

    setTimeout( () => this.alertCtrl.dismiss(), 2000);

    return await alert.present();
  }

  async errorAlert(){
    const alert = await this.alertCtrl.create({
      message: "ΠΑΡΟΥΣΙΑΣΤΗΚΕ ΠΡΟΒΛΗΜΑ"
    });

    setTimeout( () => this.alertCtrl.dismiss(), 3000);

    return await alert.present();
  }

  async loading(){
    const loading = await this.loadCtrl.create({
      message: "Παρακαλώ περιμένετε..."
    });
    return await loading.present();
  }


}
