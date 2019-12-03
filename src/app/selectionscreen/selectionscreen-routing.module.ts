import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectionscreenPage } from './selectionscreen.page';

const routes: Routes = [
  {
    path: '',
    component: SelectionscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectionscreenPageRoutingModule {}
