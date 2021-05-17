import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Creates an instance of AuthService.
   * @param {AngularFireAuth} auth
   * @param {AngularFirestore} firestore
   * @memberof AuthService
   */
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((firebaseUser) => console.log(firebaseUser));
  }

  async register(name: string, email: string, password: string) {
    const { user } = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const newUser: User = new User(user?.uid, name, user?.email);
    return await this.firestore.doc(`${newUser.uid}/user`).set({ ...newUser });
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(
      map((firebaseUser) => firebaseUser !== null)
    );
  }
}
