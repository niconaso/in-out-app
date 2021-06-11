import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const COMPONENTS = [
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
  LoadingComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule],
  exports: [...COMPONENTS],
})
export class SharedModule {}
