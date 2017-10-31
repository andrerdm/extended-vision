import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beaconData: any;

  constructor(
    public navCtrl: NavController, 
    public platform: Platform, 
    public changeDetectorRef: ChangeDetectorRef) {

  }

  startScanning() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) => {
        this.beaconData = data;
        console.log(this.beaconData);
        setTimeout(() => {
          this.changeDetectorRef.detectChanges();
        }, 1500);
      }, error => console.error(error));
    });
  }

}
