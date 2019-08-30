import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
  user: User;
}

export const initState: AuthState = {
  user: null
};

export function authReducer( state: AuthState = initState, action: fromAuth.ActionsAuth ): AuthState {

  switch (action.type) {
    case fromAuth.SET_USER:
      return { user: { ...action.user }};
    case fromAuth.UNSET_USER:
      return { user: null };
    default:
      return state;
  }
}
