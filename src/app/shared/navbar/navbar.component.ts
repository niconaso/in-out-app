import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthState } from 'src/app/auth/auth.reducer';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  state$!: Observable<AuthState>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.state$ = this.store.select('user');
  }
}
