import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  /**
   * Creates an instance of RegisterComponent.
   * @param {FormBuilder} fb
   * @param {Router} router
   * @param {AuthService} authService
   * @param {Store<AppState>} store
   * @memberof RegisterComponent
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async register() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      try {
        this.store.dispatch(ui.isLoading());

        const credentials = await this.authService.register(
          name,
          email,
          password
        );

        this.router.navigateByUrl('/');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      } finally {
        this.store.dispatch(ui.stopLoading());
      }
    }
  }
}
