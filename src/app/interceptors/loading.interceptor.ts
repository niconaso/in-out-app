import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  /**
   *
   *
   * @private
   * @type {number}
   * @memberof LoadingInterceptor
   */
  private count: number = 0;

  /**
   * Creates an instance of LoadingInterceptor.
   * @param {Store<AppState>} store
   * @memberof LoadingInterceptor
   */
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.count++;

    this.dispatchIsLoading();

    return next.handle(request).pipe(
      finalize(() => {
        this.count--;

        if (this.count === 0) {
          this.dispatchStopLoading();
        }
      })
    );
  }

  /**
   *
   *
   * @private
   * @memberof LoadingInterceptor
   */
  private dispatchIsLoading(): void {
    this.store.dispatch(ui.isLoading());
  }

  /**
   *
   *
   * @private
   * @memberof LoadingInterceptor
   */
  private dispatchStopLoading(): void {
    this.store.dispatch(ui.stopLoading());
  }
}
