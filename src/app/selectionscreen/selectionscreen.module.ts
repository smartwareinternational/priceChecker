import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectionscreenPageRoutingModule } from './selectionscreen-routing.module';

import { SelectionscreenPage } from './selectionscreen.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    SelectionscreenPageRoutingModule
  ],
  declarations: [SelectionscreenPage]
})
export class SelectionscreenPageModule {}
