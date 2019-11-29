import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {FormsModule} from '@angular/forms';
import {StoreSelectionComponent} from './store-selection/store-selection.component';
import {InfoComponent} from './info/info.component';

@NgModule({
  declarations: [StoreSelectionComponent, InfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [StoreSelectionComponent, InfoComponent]
})
export class ComponentsModule { }
