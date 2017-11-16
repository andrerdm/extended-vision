import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database'

import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { BeaconData } from '../../providers/data/beaconData';
import { Beacon } from '../../models/Beacon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  beaconList: FirebaseListObservable<BeaconData[]>;
  beaconsFound: BeaconData[];
  beacon: Beacon;

  constructor(
    public navCtrl: NavController, 
    public platform: Platform, 
    public changeDetectorRef: ChangeDetectorRef,
    public auth: AuthProvider,
    public dataProvider: DataProvider) {
      this.initializeApp();
  }

  initializeApp() {
    this.listFromDatabate();
    this.startScanning();
  }

  startScanning() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) => {
        setTimeout(() => {this.changeDetectorRef.detectChanges();}, 1500);
        
        let beacon: Beacon = data;

        this.beaconList.forEach(item => {
          item.forEach(data => {

            if (beacon.address != data.id) {
              this.beaconsFound[0] = data;
            } 

          });
        });

      }, error => console.error(error));
    });
  }

  listFromDatabate() {
    this.beaconList = this.dataProvider.list();  
  }

}
