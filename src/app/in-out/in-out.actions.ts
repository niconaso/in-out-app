import { createAction, props } from '@ngrx/store';
import { InOutItem } from '../models/in-out.model';

export const setItems = createAction(
  '[InOut Component] SetItems',
  props<{ items: InOutItem[] }>()
);
export const unSetItems = createAction('[InOut Component] UnSetItems');
