import { Route } from '@angular/router';
import { DetailComponent } from '../in-out/detail/detail.component';
import { InOutComponent } from '../in-out/in-out.component';
import { StatisticsComponent } from '../in-out/statistics/statistics.component';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: StatisticsComponent,
  },
  {
    path: 'in-out',
    component: InOutComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];
