import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { DashboarRoutingdModule } from '../dashboard/dashboard-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SortInOutPipe } from '../pipes/sort-in-out.pipe';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { InOutComponent } from './in-out.component';
import { inOutReducer } from './in-out.reducer';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InOutComponent,
    StatisticsComponent,
    DetailComponent,
    SortInOutPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('inOut', inOutReducer),
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    SharedModule,
    DashboarRoutingdModule,
  ],
})
export class InOutModule {}
