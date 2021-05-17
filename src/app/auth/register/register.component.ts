import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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
        Swal.fire({
          title: 'Espere por favor',
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const credentials = await this.authService.register(
          name,
          email,
          password
        );
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
}
