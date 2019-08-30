import * as fromUI from './ui.actions';

export interface UIState {
  isLoading: boolean;
}

export const initState: UIState = {
  isLoading: false
};

export function uiReducer( state: UIState = initState, action: fromUI.ActionsUI ): UIState {

  switch (action.type) {

    case fromUI.ACTIVAR_LOADING:
      return {
        isLoading: true
      };
    case fromUI.DESATIVAR_LOADING:
      return {
        isLoading: false
      };
    default:
      return initState;
  }
}

