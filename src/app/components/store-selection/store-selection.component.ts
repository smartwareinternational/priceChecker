import { Component, OnInit } from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-store-selection',
  templateUrl: './store-selection.component.html',
  styleUrls: ['./store-selection.component.scss'],
})
export class StoreSelectionComponent implements OnInit {

  stores = [];

  // stores = [
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  //   {active_ind: "1", name: "ΥΠΟΚΑΤΑΣΤΗΜΑ 3  ΓΛΥΦΑΔΑΣ", store_id: "1101"},
  // ];

  constructor(public navParams: NavParams, public pop: PopoverController) {
    this.getData();
  }

  ngOnInit() {}

  getData(){
    this.stores = this.navParams.get("list");
    console.log(this.stores);
  }

  selectStore(store){
    this.pop.dismiss(store);
  }

}
