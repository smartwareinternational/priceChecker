import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {FormsModule} from '@angular/forms';
import {StoreSelectionComponent} from './store-selection/store-selection.component';
import {InfoComponent} from './info/info.component';
import {ScanQRComponent} from './scan-qr/scan-qr.component';

@NgModule({
  declarations: [StoreSelectionComponent, InfoComponent, ScanQRComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [StoreSelectionComponent, InfoComponent, ScanQRComponent]
})
export class ComponentsModule { }
