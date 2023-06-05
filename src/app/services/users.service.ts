import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { ProfileUser } from '../models/user-profile';
import { Observable, from, of, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get currenUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  get allUsers(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {}

  addUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
