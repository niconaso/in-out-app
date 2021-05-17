import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  /**
   * Creates an instance of SidebarComponent.
   * @param {AuthService} authService
   * @memberof SidebarComponent
   */
  constructor(private authService: AuthService, private router: Router) {}

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
