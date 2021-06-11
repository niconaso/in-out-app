import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private inOutService: InOutService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const subs: Subscription = this.store
      .select('user')
      .pipe(
        filter((auth) => auth.user !== null),
        switchMap(({ user }) => this.inOutService.initListenItems(user?.uid))
      )
      .subscribe();

    this.subscription.add(subs);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
