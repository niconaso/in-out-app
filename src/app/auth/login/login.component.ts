import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServie: AuthService
  ) {}

  ngOnInit(): void {
    this.setFormValidations();
  }

  async login(form: FormGroup) {
    if (form.valid) {
      const { email, password } = form.value;

      try {
        Swal.fire({
          title: 'Espere por favor',
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const credentials = await this.authServie.login(email, password);
        Swal.close();

        this.router.navigateByUrl('/');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
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
