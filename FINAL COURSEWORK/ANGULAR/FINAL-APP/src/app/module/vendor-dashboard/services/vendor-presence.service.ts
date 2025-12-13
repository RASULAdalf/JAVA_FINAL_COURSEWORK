import {Injectable} from '@angular/core';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {Database, onDisconnect, onValue, ref, set} from '@angular/fire/database';

@Injectable({providedIn: 'root'})
export class PresenceService {

  constructor(private auth: Auth, private db: Database) {
    onAuthStateChanged(this.auth, (user) => {
      if (!user) return;

      const uid = user.uid;
      const userStatusRef = ref(this.db, `vendor_login/status/${uid}`);
      const connectedRef = ref(this.db, '.info/connected');

      onValue(connectedRef, (snapshot) => {
        if (snapshot.val() === false) return;

        // onDisconnect ensures proper offline behavior
        onDisconnect(userStatusRef).set({
          state: 'offline',
          last_changed: Date.now(),
        });


        // Mark online
        set(userStatusRef, {
          state: 'online',
          last_changed: Date.now(),
        });
      });
    });
  }
}
