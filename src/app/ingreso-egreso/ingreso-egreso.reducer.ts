import * as fromIE from './ingreso-egreso.actions';
import { IngresoEgresoModel } from './ingreso-egreso.model';


export interface IngresoEgresoState {
  items: IngresoEgresoModel[];
}

export const initState: IngresoEgresoState = {
  items: []
};

export function ingresoEgresoReducer( state: IngresoEgresoState = initState, action: fromIE.IEActions ): IngresoEgresoState {

  switch (action.type) {
    case fromIE.SET_ITEMS:
      return {
        items: [
          ...action.items.map( item => {
            return {
              ...item
            };
          })
        ]
      };
    case fromIE.UNSET_ITEMS:
      return {
        items: []
      };
    default:
      return state;
  }
}
