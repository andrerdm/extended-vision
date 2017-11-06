import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  public user: Observable<firebase.User>;

  constructor(private platform: Platform, private loadingCtrl: LoadingController,
              public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

}
