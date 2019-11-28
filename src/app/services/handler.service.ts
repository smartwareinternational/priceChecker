import { Injectable } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {HttpClient} from '@angular/common/http';

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
  // ============================== URLS ============================== //

  options = {};

  userData: any;
  serverLink: string;

  constructor(public natStorage: NativeStorage, public httpClient: HttpClient) {
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

        this.options = {
          headers: ({
            "Accept": "application/json",
            "ApiKey": apikey,
            "Authorization": temp.token, //TODO: Fingerprnt
            "TraceLog": "1"
          })
        };

        resolve(true);

      }, error => {
        console.log(error);
        resolve(null);
      });

    });

  }


}
