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
  
  beaconListDatabase: BeaconData[] = new Array();
  beaconsFound: BeaconData[] = new Array();
  rssi: number = -75;

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

  listFromDatabate() {
    let listObservable = this.dataProvider.list();
    listObservable.subscribe(sub => {
      console.log("########################################");
      console.log("Atualizando lista de Beacons do Firebase");
      console.log("########################################"); 
      this.beaconListDatabase = sub;
      console.log(this.beaconListDatabase);
    });
  }

  startScanning() {
    this.platform.ready().then(() => {
      console.log("#############################");
      console.log("INICIANDO PESQUISA DE BEACONS");
      console.log("#############################");
      evothings.eddystone.startScan((data) => {
        setTimeout(() => this.changeDetectorRef.detectChanges(), 2000);

        this.beaconListDatabase.forEach((b) => {

          if (b.id == data.address) {
            
            if (data.rssi > this.rssi) {
              this.addBeacon(b);
            } else {
              this.removeBeacon(b);
            }
            
          }
        });

      }, error => console.error(error));
    });
  }

  addBeacon(b: BeaconData) {
    let alreadyExists = this.beaconsFound.find(i => i.id == b.id);
    if (!alreadyExists) {
      console.log('Beacon encontrado: '+ b.id);              
      this.beaconsFound.push(b);
    }
  }

  removeBeacon(b: BeaconData) {
    let index = this.beaconsFound.indexOf(b);
    if (index > -1) {
      this.beaconsFound.splice(index);
    }
  }

}
