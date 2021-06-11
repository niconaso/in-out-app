import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { InOutItem } from 'src/app/models/in-out.model';
import { InOutService } from 'src/app/services/in-out.service';
import Swal from 'sweetalert2';
import { InOutState } from '../in-out.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent implements OnInit, OnDestroy {
  items: InOutItem[] = [];

  private subscription!: Subscription;

  constructor(
    private store: Store<InOutState>,
    private inOutService: InOutService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('inOut')
      .subscribe(({ items }) => (this.items = [...items]));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async remove(itemId: string) {
    try {
      await this.inOutService.remove(itemId);
      Swal.fire('Eliminado', 'Item eliminado', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  }
}
