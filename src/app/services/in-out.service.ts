import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import 'firebase/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as inOut from '../in-out/in-out.actions';
import { InOut, InOutItem } from '../models/in-out.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InOutService {
  /**
   * Creates an instance of InOutService.
   * @param {AngularFirestore} firestore
   * @param {AuthService} authService
   * @memberof InOutService
   */
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  create(inOut: InOut): Promise<any> {
    const uid: string | undefined = this.authService.user.uid;
    return this.firestore
      .doc(`${uid}/in-out`)
      .collection('items')
      .add({ ...inOut });
  }

  initListenItems(uid: string | undefined): Observable<InOutItem[]> {
    return this.firestore
      .collection(`${uid}/in-out/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) => this.mapSnapshotToInOutItems(snapshot)),
        tap((items: InOutItem[]) =>
          this.store.dispatch(inOut.setItems({ items }))
        )
      );
  }

  remove(itemId: string): Promise<any> {
    const uid: string | undefined = this.authService.user.uid;
    return this.firestore.doc(`${uid}/in-out/items/${itemId}`).delete();
  }

  private mapSnapshotToInOutItems(
    snapshot: DocumentChangeAction<any>[]
  ): InOutItem[] {
    return snapshot.map((doc) => ({
      uid: doc.payload.doc.id,
      ...doc.payload.doc.data(),
    }));
  }
}
