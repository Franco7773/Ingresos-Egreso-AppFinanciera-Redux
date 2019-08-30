import { ActionReducerMap } from '@ngrx/store';
import * as fromUIReducer from './shared/ui.reducer';
import * as fromAuthReducer from './auth/auth.reducer';
import * as fromIEReducer from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
  ui: fromUIReducer.UIState;
  auth: fromAuthReducer.AuthState;
  ie: fromIEReducer.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUIReducer.uiReducer,
  auth: fromAuthReducer.authReducer,
  ie: fromIEReducer.ingresoEgresoReducer
};
