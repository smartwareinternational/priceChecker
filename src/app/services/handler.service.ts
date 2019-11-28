import { Injectable } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {HttpClient} from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import {Platform} from '@ionic/angular';

const apikey = "5F18A40A-D21B-EEF0-3E92-8F5266AD0E50";

const httpOptions = {
  headers: ({
    "Accept": "application/json",
    "ApiKey": apikey,
    "TraceLog": "1"
  })
};

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  // ============================== URLS ============================== //
  url_liststores = "/api/v1/liststores/index";
  url_liststores_hello = "/api/v1/liststores/hello";
  url_posvalidate = "/api/v1/users/validate";
  url_poslogin = "/api/v1/pos/login";
  // ============================== URLS ============================== //

  options = {};

  userData: any;
  serverLink: string;
  validateData: any;

  constructor(public natStorage: NativeStorage, public httpClient: HttpClient, public device: Device) {
  }

  autoLogin() {
    this.natStorage.getItem('userData')
        .then(
            data => {
              console.log('successfully loaded data');
              console.log(data);
              this.userData = data;
            },
            error => console.error(error)
        );
  }

  storeData(data) {
    return new Promise(resolve => {
      this.natStorage.setItem('userData', data)
          .then(() => {
            console.log("data stored");
            resolve(true);
          }, error => {
            console.log("data not stored");
            resolve(false);
          });
    });
  }


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
        resolve(null);
      });

    });
  }

   isConnected(){
    let url = this.serverLink + this.url_liststores_hello;
    console.log(url);

    return new Promise( resolve => {

      this.httpClient.get(url, httpOptions).subscribe( response => {
        console.log(response);
        resolve(true);
      }, error => {
        console.log(error);
        resolve(false);
      });

    });

  }


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
            "FingerPrint": this.device.uuid,
            "TraceLog": "1"
          })
        };

        resolve(true);

      }, error => {
        console.log(error);
        resolve(false);
      });

    });

  }

  saveCredentials(credentials){
    this.natStorage.setItem('credentials', credentials)
      .then( () => {console.log('credentials stored');},
          error => {console.log('Something went wrong. credentials could not be stored');}
      );
  }


  login(body){

    let url = this.serverLink + this.url_poslogin;

    let temp: any;

    return new Promise( resolve => {

      this.httpClient.post(url, body, this.options).subscribe( response => {

        console.log(response);
        temp = response;
        temp = temp.result[0].data[0];

        this.userData = temp;
        resolve(true);

      }, error => {
        console.log(error);
        resolve(false);
      });

    });

  }


}
