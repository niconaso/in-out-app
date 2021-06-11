import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { InOut } from '../models/in-out.model';
import { InOutService } from '../services/in-out.service';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-in-out',
  templateUrl: './in-out.component.html',
  styles: [],
})
export class InOutComponent implements OnInit {
  inOutForm!: FormGroup;

  type: 'in' | 'out' = 'in';

  constructor(
    private readonly inOutService: InOutService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.setFormValidations();
  }

  toggleType() {
    this.type = this.type === 'in' ? 'out' : 'in';
  }

  async save(form: FormGroup) {
    if (form.valid) {
      const { description, amount } = form.value;
      const inOut: InOut = new InOut(description, amount, this.type);

      this.store.dispatch(ui.isLoading());

      try {
        await this.inOutService.create(inOut);
        this.inOutForm.reset();
        Swal.fire('Registro creado', description, 'success');
      } catch (error) {
        Swal.fire('Error', error.message, 'error');
      } finally {
        this.store.dispatch(ui.stopLoading());
      }
    }
  }

  private setFormValidations() {
    const description: FormControl = new FormControl('', [Validators.required]);
    const amount: FormControl = new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ]);

    this.inOutForm = new FormGroup({
      description,
      amount,
    });
  }
}
