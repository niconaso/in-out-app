import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthState } from 'src/app/auth/auth.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  state$!: Observable<AuthState>;

  /**
   * Creates an instance of SidebarComponent.
   * @param {AuthService} authService
   * @param {Router} router
   * @param {Store<AppState>} store
   * @memberof SidebarComponent
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.state$ = this.store.select('user');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
