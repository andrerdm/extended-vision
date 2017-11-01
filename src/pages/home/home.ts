import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beaconData: any;

  constructor(
    public navCtrl: NavController, 
    public platform: Platform, 
    public changeDetectorRef: ChangeDetectorRef,
    public auth: AuthProvider) {
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

  signInWithEmail() {
    this.auth.signInWithEmailAndPassword("extended-vision@app.com", "3xt3nd3d")
    .then((data) => {
      console.log(data)
    }, (error) => {
      let errorMessage: String;

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Insira um email válido.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Combinação de usuário e senha incorreta.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Combinação de usuário e senha incorreta.';
          break;
        default:
          errorMessage = error;
          break;
      }
      console.log(errorMessage);
    });
  }

}
