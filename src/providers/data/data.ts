import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database'

import { BeaconData } from '../../providers/data/beaconData';


@Injectable()
export class DataProvider {
  constructor(private afDB: AngularFireDatabase) {   
  }

  list(): FirebaseListObservable<BeaconData[]> {
    return this.afDB.list('/beacons/');
  }

}