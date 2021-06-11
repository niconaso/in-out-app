import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Label, MultiDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { InOutItem } from 'src/app/models/in-out.model';
import { InOutState } from '../in-out.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  in: number = 0;
  out: number = 0;

  totalIn: number = 0;
  totalOut: number = 0;

  // Doughnut
  doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  doughnutChartData: MultiDataSet = [[]];

  private subscription!: Subscription;

  constructor(private store: Store<InOutState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('inOut')
      .subscribe(({ items }) => this.getStatistics(items));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getStatistics(items: InOutItem[]): void {
    this.totalIn = 0;
    this.totalOut = 0;
    this.in = 0;
    this.out = 0;

    items.forEach((item: InOutItem) => {
      if (item.type === 'in') {
        this.totalIn += item.amount;
        this.in++;
      } else {
        this.totalOut += item.amount;
        this.out++;
      }
    });

    this.doughnutChartData = [[this.totalIn, this.totalOut]];
  }
}
