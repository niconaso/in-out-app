import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as auth from '../auth/auth.actions';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subscription!: Subscription;
  /**
   * Creates an instance of AuthService.
   * @param {AngularFireAuth} auth
   * @param {AngularFirestore} firestore
   * @memberof AuthService
   */
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((firebaseUser) => this.setUser(firebaseUser));
  }

  private setUser(firebaseUser: firebase.User | null) {
    if (firebaseUser) {
      this.subscription = this.firestore
        .doc(`${firebaseUser.uid}/user`)
        .valueChanges()
        .subscribe((firestoreUser: any) => {
          const user: User = User.fromFirebase(firestoreUser);

          this.store.dispatch(auth.setUser({ user }));
        });
    } else {
      this.subscription?.unsubscribe();
      this.store.dispatch(auth.unSetUser());
    }
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
    this.store.dispatch(auth.unSetUser());
    this.subscription.unsubscribe();
    return this.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(
      map((firebaseUser) => firebaseUser !== null)
    );
  }
}
