import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataProvider {
  constructor(private afDB: AngularFireDatabase) {   
  }

  list(): FirebaseListObservable<any> {
    return this.afDB.list("/beacon");
  }

}