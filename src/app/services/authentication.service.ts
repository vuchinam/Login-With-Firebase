import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserInfo,
} from '@angular/fire/auth';

import { Observable, concatMap, from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  login(username: any, password: any) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(email: any, password: any) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not Authenticated');

        return updateProfile(user, profileData);
      })
    );
  }

  logout() {
    return from(this.auth.signOut());
  }
}
