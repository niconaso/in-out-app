import { Action, createReducer, on } from '@ngrx/store';
import { InOutItem } from '../models/in-out.model';
import { setItems, unSetItems } from './in-out.actions';

export interface State {
  items: InOutItem[];
}

export const initialState: State = {
  items: [],
};

const _inOutReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export function inOutReducer(state: State | undefined, action: Action) {
  return _inOutReducer(state, action);
}
