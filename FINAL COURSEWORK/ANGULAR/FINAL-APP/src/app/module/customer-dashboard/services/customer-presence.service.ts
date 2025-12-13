import {Injectable} from '@angular/core';
import {Database, onDisconnect, onValue, ref, set} from '@angular/fire/database';
import {LocalDataService} from "../../../core/services/local-data.service";

@Injectable({providedIn: 'root'})
export class CustomerPresenceService {

  constructor(private localStorageService: LocalDataService, private db: Database) {
    const uid = this.localStorageService.getCookie('userEmail').replace('.com', '');
    const userStatusRef = ref(this.db, `customer_login/status/${uid}`);
    const connectedRef = ref(this.db, '.info/connected');

    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === false) return;

      // onDisconnect ensures proper offline behavior
      onDisconnect(userStatusRef).set({
        state: 'offline',
        last_changed: Date.now(),
        email: this.localStorageService.getCookie('userEmail'),
        picture: this.localStorageService.getCookie('userPic')
      });


      // Mark online
      set(userStatusRef, {
        state: 'online',
        last_changed: Date.now(),
        email: this.localStorageService.getCookie('userEmail'),
        picture: this.localStorageService.getCookie('userPic')
      });
    });
  }
}
