import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import { HttpClientModule } from '@angular/common/http';
import {ComponentsModule} from './components/components.module';
import {StoreSelectionComponent} from './components/store-selection/store-selection.component';
import {Device} from '@ionic-native/device/ngx';
import {InfoComponent} from './components/info/info.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [StoreSelectionComponent, InfoComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    Device,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
