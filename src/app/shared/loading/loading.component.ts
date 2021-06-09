import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loading',
  template: '<ng-container></ng-container>',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  /**
   *
   *
   * @private
   * @type {Subscription}
   * @memberof LoadingComponent
   */
  private subscription: Subscription = new Subscription();

  /**
   * Creates an instance of LoadingComponent.
   * @param {Store<AppState>} store
   * @memberof LoadingComponent
   */
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('ui').subscribe((ui) => this.toggleLoading(ui.isLoading));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private toggleLoading(isLoading: boolean): void {
    if (isLoading) {
      Swal.fire({
        title: 'Espere por favor',
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }
}
