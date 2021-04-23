import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HandlerService} from '../services/handler.service';
import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-selectionscreen',
  templateUrl: './selectionscreen.page.html',
  styleUrls: ['./selectionscreen.page.scss'],
})
export class SelectionscreenPage implements OnInit {

  loginForm: FormGroup;

  didSelect = false;
  error = false;

  constructor(private platform: Platform, private splashScreen: SplashScreen, public formBuild: FormBuilder, public navCtrl: NavController, public handler: HandlerService) {

    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });

    this.loginForm = this.formBuild.group({
      ip: ['', Validators.required],
      port: ['', Validators.required],
      store_id: ['', Validators.required],
      user_name: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.getSavedCredentials();

    this.awaitSelection();
  }

  ngOnInit() {
  }

  // AUTOLOGIN --------------------------------------------------

  getSavedCredentials(){
    let temp: any;
    this.handler.autoLogin()
      .then( resolve => {
        if (resolve != null){
          temp = resolve;

          this.loginForm = this.formBuild.group({
            ip: [temp.ip, Validators.required],
            port: [temp.port, Validators.required],
            store_id: [temp.store_id, Validators.required],
            user_name: [temp.user_name, Validators.required],
            password: [temp.password, Validators.required],
            shortDescr: [temp.shortDescr == undefined ? false : temp.shortDescr, Validators.required]
          });
          this.handler.serverLink = "http://" + this.loginForm.value.ip + ":" + this.loginForm.value.port;

          this.handler.loginFormSetUp = this.loginForm;

        }
      });
  }
  // --------------------------------------------------


  // AWAIT SELECTION --------------------------------------------------

  awaitSelection(){

    setTimeout( () => {
      console.log(this.handler.loginFormSetUp);
      if (!this.didSelect){
        if (this.handler.loginFormSetUp != undefined){
          this.submit();
        }else{
          this.goLanding();
        }
      }
    }, 10000);

  }
  // --------------------------------------------------


  // SUBMIT FORM --------------------------------------------------

  submit(){

    let body = {
      "store_id":  this.loginForm.value.store_id,
      "user_name": this.loginForm.value.user_name,
      "pwd": this.loginForm.value.password
    };

    console.log(body);

    this.handler.validate(body)
      .then( resolve => {
        if (resolve){
          this.handler.shortDescr = this.loginForm.value.shortDescr;
          this.handler.saveCredentials(this.loginForm.value);
          this.grabLogin(body);
        }else{
          this.error = true;
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
        }else{
          this.error = true;
        }
      });
  }
  // --------------------------------------------------


  // NAVIGATE TO FORM --------------------------------------------------
  goLanding(){
    this.didSelect = true;
    this.navCtrl.navigateForward('landing');
  }
  // --------------------------------------------------

  exit(){
    this.didSelect = true;
    navigator["app"].exitApp();
  }

}
