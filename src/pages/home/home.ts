import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';

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

  constructor(
    public navCtrl: NavController, 
    public platform: Platform, 
    public changeDetectorRef: ChangeDetectorRef,
    public auth: AuthProvider,
    public dataProvider: DataProvider,
    public tts: TextToSpeech) {
      this.initializeApp();
  }

  initializeApp() {
    this.listFromDatabate();
    this.startScanning();
  }

  listFromDatabate() {
    let listObservable = this.dataProvider.list();
    listObservable.subscribe(sub => {
      this.beaconListDatabase = sub;
      console.log("Lista do banco de dados");
      console.log(this.beaconListDatabase);
    });
  }

  startScanning() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) => {
        setTimeout(() => this.changeDetectorRef.detectChanges(), 1000);

        this.beaconListDatabase.forEach((b) => {

          if (b.id == data.address) { 
            let distance = data.rssi * -1;
            let minimumDistance = this.getMinimumDistance(b) * -1;

            if (distance < minimumDistance) {
              this.addBeacon(b);
            } else {
              if (distance - minimumDistance > 4) {
                this.removeBeacon(b);
              }
            }
          }
        });
      }, error => console.error(error));
    });
  }

  getMinimumDistance(b: BeaconData) :number {
    switch (b.signalStrength) {
      case '1':
        return -72;
      case '2':
        return -82;
      case '3':
        return -90;
      default:
        return -100;
    }

  }

  addBeacon(b: BeaconData) {
    let alreadyExists = this.beaconsFound.find(i => i.id == b.id);
    if (!alreadyExists) {
      console.log('Beacon encontrado: '+ b.id);              
      this.beaconsFound.push(b);
      this.speakMsg(b.message);
    }
  }

  speakMsg(msg: string) {
    this.tts.speak({
      text: msg,
      locale: 'pt-BR',
      rate: 0.8
    });
  }

  removeBeacon(b: BeaconData) {
    let index = this.beaconsFound.findIndex(i => i.id == b.id);
    if (index > -1) {
      this.beaconsFound.splice(index);
    }
  }

}
