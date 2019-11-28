import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {FormsModule} from '@angular/forms';
import {StoreSelectionComponent} from './store-selection/store-selection.component';

@NgModule({
  declarations: [StoreSelectionComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [StoreSelectionComponent]
})
export class ComponentsModule { }
