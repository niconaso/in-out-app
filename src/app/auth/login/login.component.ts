import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  /**
   * Creates an instance of LoginComponent.
   * @param {FormBuilder} fb
   * @param {Router} router
   * @param {AuthService} authServie
   * @param {Store<AppState>} store
   * @memberof LoginComponent
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServie: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.setFormValidations();
  }

  async login(form: FormGroup) {
    if (form.valid) {
      try {
        const { email, password } = form.value;

        this.store.dispatch(ui.isLoading());
        const credentials = await this.authServie.login(email, password);

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

  private setFormValidations() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
