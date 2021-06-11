import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as inOut from './in-out/in-out.reducer';

export interface AppState {
  ui: ui.State;
  user: auth.AuthState;
  inOut: inOut.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  inOut: inOut.inOutReducer,
};
