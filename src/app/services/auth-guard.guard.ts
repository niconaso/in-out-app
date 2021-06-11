import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((state: boolean) => {
        if (!state) {
          this.router.navigateByUrl('/login');
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((state: boolean) => {
        if (!state) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
